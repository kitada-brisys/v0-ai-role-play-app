"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Mic, MicOff, Volume2, VolumeX, Video, VideoOff, Clock, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface RoleplaySessionProps {
  settings: any
  onEnd: () => void
}

export default function RoleplaySession({ settings, onEnd }: RoleplaySessionProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(settings.format === "video")
  const [elapsedTime, setElapsedTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [messages, setMessages] = useState<{ role: string; content: string; timestamp: Date }[]>([
    {
      role: "ai",
      content: "こんにちは、私はAIアシスタントです。今日はどのようなお手伝いができますか？",
      timestamp: new Date(),
    },
  ])
  const [currentPhase, setCurrentPhase] = useState("オープニング")
  const [phaseProgress, setPhaseProgress] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showTip, setShowTip] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("conversation")

  // 経過時間のカウント
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => {
        const newTime = prev + 1
        // 進捗率の計算（目標時間に対する経過時間の割合）
        const newProgress = Math.min((newTime / (settings.targetTime * 60)) * 100, 100)
        setProgress(newProgress)
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [settings.targetTime])

  // フェーズの自動更新
  useEffect(() => {
    const phases = ["オープニング", "ヒアリング", "提案", "クロージング"]
    const phaseChangeTimes = [60, 300, 600] // 秒単位でのフェーズ変更タイミング
    const phaseDurations = [60, 240, 300, 300] // 各フェーズの長さ（秒）

    let currentPhaseIndex = 0
    for (let i = 0; i < phaseChangeTimes.length; i++) {
      if (elapsedTime < phaseChangeTimes[i]) {
        currentPhaseIndex = i
        setCurrentPhase(phases[i])

        // 現在のフェーズの進捗を計算
        const phaseStartTime = i === 0 ? 0 : phaseChangeTimes[i - 1]
        const phaseDuration = phaseDurations[i]
        const phaseElapsedTime = elapsedTime - phaseStartTime
        const newPhaseProgress = Math.min((phaseElapsedTime / phaseDuration) * 100, 100)
        setPhaseProgress(newPhaseProgress)

        break
      } else if (i === phaseChangeTimes.length - 1) {
        currentPhaseIndex = i + 1
        setCurrentPhase(phases[i + 1])

        // クロージングフェーズの進捗を計算
        const phaseStartTime = phaseChangeTimes[i]
        const phaseDuration = phaseDurations[i + 1]
        const phaseElapsedTime = elapsedTime - phaseStartTime
        const newPhaseProgress = Math.min((phaseElapsedTime / phaseDuration) * 100, 100)
        setPhaseProgress(newPhaseProgress)
      }
    }
  }, [elapsedTime])

  // AIの応答をシミュレート
  useEffect(() => {
    if (isRecording) {
      const timer = setTimeout(() => {
        setIsTyping(true)

        setTimeout(() => {
          const aiResponses = [
            "なるほど、その点についてもう少し詳しく教えていただけますか？",
            "ご質問ありがとうございます。その課題については次のように考えています。",
            "おっしゃる通りです。その上で、こちらの提案が御社の課題解決に役立つと考えています。",
            "ご懸念点は理解できます。実際に他のお客様でも同様の課題がありましたが、このように解決しました。",
          ]
          const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

          setMessages((prev) => [...prev, { role: "ai", content: randomResponse, timestamp: new Date() }])
          setIsTyping(false)
        }, 2000)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isRecording, messages])

  // 新しいメッセージが追加されたらスクロールエリアを一番下にスクロール
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }, [messages, isTyping])

  const toggleRecording = () => {
    setIsRecording(!isRecording)

    if (!isRecording) {
      // 録音開始時のユーザーメッセージ
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: "（ユーザー発言中...）",
          timestamp: new Date(),
        },
      ])
    } else {
      // 録音停止時にユーザーメッセージを更新
      setMessages((prev) => {
        const newMessages = [...prev]
        const lastIndex = newMessages.findIndex((m) => m.content === "（ユーザー発言中...）")
        if (lastIndex !== -1) {
          newMessages[lastIndex] = {
            ...newMessages[lastIndex],
            content: "こんにちは、御社の製品に興味があります。もう少し詳しく教えていただけますか？",
          }
        }
        return newMessages
      })
    }
  }

  // 時間のフォーマット（mm:ss）
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // フェーズに応じた色を返す
  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "オープニング":
        return "bg-blue-500"
      case "ヒアリング":
        return "bg-purple-500"
      case "提案":
        return "bg-amber-500"
      case "クロージング":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
      <Card className="lg:col-span-2 flex flex-col shadow-lg border-t-4 border-t-blue-500">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Clock className="h-5 w-5 text-blue-600" />
              </motion.div>
              セッション実行中
            </CardTitle>
            <CardDescription>
              {settings.salesType === "is" ? "インサイドセールス" : "フィールドセールス"} - {settings.scenario}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{formatTime(elapsedTime)}</div>
            <div className="text-sm text-muted-foreground">目標: {settings.targetTime}分</div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-0 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">進捗状況</span>
              <Badge className={`${getPhaseColor(currentPhase)} text-white`}>{currentPhase}</Badge>
            </div>
            <Progress value={progress} className="h-2" />

            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">フェーズ進捗:</span>
              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${getPhaseColor(currentPhase)}`}
                  style={{ width: `${phaseProgress}%` }}
                />
              </div>
              <span className="text-xs font-medium">{Math.round(phaseProgress)}%</span>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="mx-4 mt-2">
              <TabsTrigger value="conversation">会話</TabsTrigger>
              <TabsTrigger value="info">セッション情報</TabsTrigger>
            </TabsList>

            <TabsContent value="conversation" className="flex-1 flex flex-col lg:flex-row p-0 m-0">
              <div className="w-full lg:w-1/2 p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r">
                <div className="relative">
                  <motion.div
                    className="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4 relative"
                    animate={isTyping ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  >
                    <span className="text-5xl">👨‍💼</span>
                    {messages[messages.length - 1]?.role === "ai" && !isTyping && (
                      <span className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full animate-pulse"></span>
                    )}
                    {isTyping && (
                      <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2">
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                        >
                          <Volume2 className="h-4 w-4" />
                        </motion.div>
                      </div>
                    )}
                  </motion.div>

                  <div className="absolute -right-2 top-0">
                    <Badge className={`${getPhaseColor(currentPhase)} text-white`}>AI</Badge>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-medium">AIアシスタント</h3>
                  <p className="text-sm text-muted-foreground">
                    {customerTypeToName(settings.customerType)} / {settings.customerPosition}
                  </p>
                </div>
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-full relative">
                  {isTyping ? (
                    <div className="flex items-center gap-2">
                      <motion.div className="flex gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <motion.div
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.4 }}
                        />
                      </motion.div>
                      <span className="text-sm text-muted-foreground">AIが応答中...</span>
                    </div>
                  ) : (
                    <p>
                      {messages[messages.length - 1]?.role === "ai" ? messages[messages.length - 1]?.content : "..."}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full lg:w-1/2 p-6 flex flex-col">
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                        {currentPhase}フェーズ
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatTime(elapsedTime)} / {settings.targetTime}:00
                      </span>
                    </h3>

                    <AnimatePresence>
                      {showTip && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-4"
                        >
                          <Alert className="bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>フェーズのヒント</AlertTitle>
                            <AlertDescription>
                              {currentPhase === "オープニング" &&
                                "自己紹介と会社紹介を簡潔に行い、顧客との信頼関係を構築しましょう。"}
                              {currentPhase === "ヒアリング" &&
                                "オープンクエスチョンを使って顧客のニーズや課題を深掘りしましょう。"}
                              {currentPhase === "提案" &&
                                "ヒアリングで得た情報をもとに、顧客の課題解決につながる提案をしましょう。"}
                              {currentPhase === "クロージング" &&
                                "次のステップを明確に提案し、顧客のコミットメントを得ましょう。"}
                            </AlertDescription>
                          </Alert>
                          <div className="flex justify-end mt-1">
                            <Button variant="ghost" size="sm" onClick={() => setShowTip(false)}>
                              閉じる
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                        <span className="font-medium">シナリオ:</span> {settings.scenario}
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                        <span className="font-medium">顧客タイプ:</span> {customerTypeToName(settings.customerType)}
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                        <span className="font-medium">役職:</span> {settings.customerPosition}
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                        <span className="font-medium">テーマ:</span> {settings.theme || "一般"}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-2 mb-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setIsMuted(!isMuted)}
                              className={isMuted ? "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200" : ""}
                            >
                              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{isMuted ? "ミュート解除" : "ミュート"}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      {settings.format === "video" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                                className={
                                  !isVideoEnabled ? "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200" : ""
                                }
                              >
                                {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>{isVideoEnabled ? "ビデオオフ" : "ビデオオン"}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>

                    <Button
                      size="lg"
                      variant={isRecording ? "destructive" : "default"}
                      className={`rounded-full w-20 h-20 ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}`}
                      onClick={toggleRecording}
                    >
                      {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                    </Button>
                    <p className="text-center mt-2 text-sm text-muted-foreground">
                      {isRecording ? "録音中... クリックで停止" : "クリックして話す"}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="info" className="flex-1 p-4 m-0 overflow-auto">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">セッション詳細</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium text-muted-foreground">営業タイプ:</span>
                        <span className="ml-2">
                          {settings.salesType === "is" ? "インサイドセールス" : "フィールドセールス"}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-muted-foreground">シナリオ:</span>
                        <span className="ml-2">{settings.scenario}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-muted-foreground">顧客タイプ:</span>
                        <span className="ml-2">{customerTypeToName(settings.customerType)}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-muted-foreground">役職:</span>
                        <span className="ml-2">{settings.customerPosition}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium text-muted-foreground">評価厳格さ:</span>
                        <span className="ml-2">レベル {settings.strictness}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-muted-foreground">目標時間:</span>
                        <span className="ml-2">{settings.targetTime}分</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-muted-foreground">研修テーマ:</span>
                        <span className="ml-2">{settings.theme || "一般"}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-muted-foreground">形式:</span>
                        <span className="ml-2">{settings.format === "audio" ? "音声のみ" : "動画"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">フェーズ進行状況</h3>
                  <div className="space-y-2">
                    {["オープニング", "ヒアリング", "提案", "クロージング"].map((phase, index) => (
                      <div key={phase} className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            currentPhase === phase ? getPhaseColor(phase) : "bg-gray-300"
                          }`}
                        />
                        <span className={`text-sm ${currentPhase === phase ? "font-medium" : "text-muted-foreground"}`}>
                          {phase}
                        </span>
                        {currentPhase === phase && (
                          <Badge variant="outline" size="sm">
                            進行中
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <div className="p-4 border-t bg-gray-50 dark:bg-gray-900">
          <Button variant="outline" onClick={onEnd} className="w-full">
            セッション終了
          </Button>
        </div>
      </Card>

      {/* 会話ログカード */}
      <Card className="h-full flex flex-col">
        <CardHeader className="bg-gray-100 dark:bg-gray-800">
          <CardTitle className="text-lg flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            リアルタイム会話ログ
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-grow">
          <div className="h-full overflow-auto" ref={scrollAreaRef}>
            <div className="p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === "ai" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "ai"
                        ? "bg-blue-100 dark:bg-blue-900 text-left"
                        : "bg-gray-100 dark:bg-gray-800 text-right"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" size="sm">
                        {message.role === "ai" ? "AI" : "ユーザー"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" size="sm">
                        AI
                      </Badge>
                      <span className="text-xs text-muted-foreground">入力中...</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <motion.div
                        className="w-2 h-2 bg-blue-500 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-blue-500 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-blue-500 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function customerTypeToName(type: string): string {
  const types: Record<string, string> = {
    "分析的-詳細重視": "分析的",
    "友好的-協力的": "友好的",
    "懐疑的-慎重": "懐疑的",
    "多忙-時間重視": "多忙",
    "攻撃的-挑戦的": "挑戦的",
    "優柔不断-躊躇": "優柔不断",
  }
  return types[type] || type
}
