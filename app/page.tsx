"use client"

import { useState } from "react"
import RoleplaySetup from "@/components/roleplay-setup"
import RoleplaySession from "@/components/roleplay-session"
import RoleplayResults from "@/components/roleplay-results"
import { AnimatePresence, motion } from "framer-motion"

export default function Home() {
  const [step, setStep] = useState<"setup" | "session" | "results">("setup")
  const [settings, setSettings] = useState({
    format: "audio",
    salesType: "is",
    scenario: "",
    customerType: "",
    customerPosition: "",
    evaluationLevel: 3,
    targetTime: 15,
    theme: "",
  })

  const handleStartSession = (formData: any) => {
    setSettings(formData)
    setStep("session")
  }

  const handleEndSession = () => {
    setStep("results")
  }

  const handleNewSession = () => {
    setStep("setup")
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <AnimatePresence mode="wait">
        {step === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <RoleplaySetup onStart={handleStartSession} />
          </motion.div>
        )}
        {step === "session" && (
          <motion.div
            key="session"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <RoleplaySession settings={settings} onEnd={handleEndSession} />
          </motion.div>
        )}
        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <RoleplayResults settings={settings} onNewSession={handleNewSession} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
