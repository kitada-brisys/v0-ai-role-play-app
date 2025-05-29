"use client"

import { TooltipContent, TooltipTrigger, Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, UserCircle2, History, Settings, HelpCircle, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Hydration fix
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const routes = [
    {
      label: "AIロールプレイ",
      icon: <UserCircle2 className="h-5 w-5" />,
      href: "/",
      active: pathname === "/",
      color: "text-blue-500",
    },
    {
      label: "履歴・結果",
      icon: <History className="h-5 w-5" />,
      href: "/history",
      active: pathname === "/history",
      color: "text-purple-500",
    },
  ]

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden absolute left-4 top-4 z-10">
          <Button variant="outline" size="icon" className="rounded-full shadow-md">
            <Menu className="h-5 w-5" />
            <span className="sr-only">メニューを開く</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <MobileSidebar routes={routes} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      <aside className="hidden lg:flex h-full w-72 flex-col border-r bg-white dark:bg-gray-950 shadow-md">
        <DesktopSidebar routes={routes} />
      </aside>
    </>
  )
}

function MobileSidebar({ routes, setOpen }: { routes: any[]; setOpen: (open: boolean) => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <UserCircle2 className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold">営業研修AI</h1>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-4">
          {routes.map((route, index) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-blue-50 dark:hover:bg-blue-950",
                route.active
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-50"
                  : "text-gray-500 dark:text-gray-400",
              )}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                className={cn("p-1 rounded-md", route.active ? route.color : "text-gray-500")}
              >
                {route.icon}
              </motion.div>
              {route.label}
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>ユ</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">ユーザー名</p>
              <p className="text-xs text-muted-foreground">営業部</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="icon" className="rounded-lg">
            <Settings className="h-4 w-4" />
            <span className="sr-only">設定</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-lg">
            <HelpCircle className="h-4 w-4" />
            <span className="sr-only">ヘルプ</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-lg">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">ログアウト</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

function DesktopSidebar({ routes }: { routes: any[] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <UserCircle2 className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold">営業研修AI</h1>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-4">
          {routes.map((route, index) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-blue-50 dark:hover:bg-blue-950",
                route.active
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-50"
                  : "text-gray-500 dark:text-gray-400",
              )}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                className={cn("p-1 rounded-md", route.active ? route.color : "text-gray-500")}
              >
                {route.icon}
              </motion.div>
              {route.label}
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>ユ</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">ユーザー名</p>
              <p className="text-xs text-muted-foreground">営業部</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-lg">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">設定</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>設定</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-lg">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">ヘルプ</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>ヘルプ</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-lg">
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">ログアウト</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>ログアウト</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
