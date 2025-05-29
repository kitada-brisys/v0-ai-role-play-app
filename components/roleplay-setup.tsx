"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mic, Video, Phone, Users, Briefcase, Clock, Target, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RoleplaySetupProps {
  onStart: (settings: any) => void
}

export default function RoleplaySetup({ onStart }: RoleplaySetupProps) {
  const [format, setFormat] = useState("audio")
  const [salesType, setSalesType] = useState("is")
  const [scenario, setScenario] = useState("")
  const [customerType, setCustomerType] = useState("")
  const [customerPosition, setCustomerPosition] = useState("")
  const [evaluationLevel, setEvaluationLevel] = useState([3])
  const [targetTime, setTargetTime] = useState([15])
  const [theme, setTheme] = useState("")
  const [activeTab, setActiveTab] = useState("basic")

  const isScenarios = {
    新規開拓電話: "新規開拓電話",
    反響対応: "反響対応",
    リード育成: "リード育成",
    受付突破: "受付突破",
    フォローアップ電話: "フォローアップ電話",
  }

  const fsScenarios = {
    会社説明: "会社説明",
    ニーズ分析: "ニーズ分析",
    商品デモ: "商品デモ",
    提案プレゼンテーション: "提案プレゼンテーション",
    クロージング技法: "クロージング技法",
    質疑応答: "質疑応答",
    総合ロールプレイ: "総合ロールプレイ",
  }

  const customerTypes = {
    "分析的-詳細重視": "分析的-詳細重視",
    "友好的-協力的": "友好的-協力的",
    "懐疑的-慎重": "懐疑的-慎重",
    "多忙-時間重視": "多忙-時間重視",
    "攻撃的-挑戦的": "攻撃的-挑戦的",
    "優柔不断-躊躇": "優柔不断-躊躇",
  }

  const customerPositions = {
    経営幹部: "経営幹部",
    部門マネージャー: "部門マネージャー",
    現場スタッフ: "現場スタッフ",
    "受付-ゲートキーパー": "受付-ゲートキーパー",
    主要意思決定者: "主要意思決定者",
    キーインフルエンサー: "キーインフルエンサー",
    技術専門家: "技術専門家",
  }

  const themeOptions = [
    "反対意見対応の習得",
    "価値提案の向上",
    "ラポール構築",
    "簡潔なコミュニケーション",
    "質問力の向上",
    "クロージングスキル",
    "ニーズ分析力",
  ]

  const handleSubmit = () => {
    onStart({
      format,
      salesType,
      scenario,
      customerType,
      customerPosition,
      evaluationLevel: evaluationLevel[0],
      targetTime: targetTime[0],
      theme,
    })
  }

  const scenarios = salesType === "is" ? isScenarios : fsScenarios

  const isFormValid = scenario && customerType && customerPosition

  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-t-4 border-t-blue-500">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardTitle className="text-2xl flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Users className="h-6 w-6 text-blue-600" />
          </motion.div>
          ロールプレイ設定
        </CardTitle>
        <CardDescription>AIロールプレイのパラメータを設定してください</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="basic">基本設定</TabsTrigger>
            <TabsTrigger value="advanced">詳細設定</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium">ロープレ形式選択</h3>
              </div>
              <RadioGroup value={format} onValueChange={setFormat} className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                  <RadioGroupItem value="audio" id="audio" />
                  <Label htmlFor="audio" className="flex items-center gap-2 cursor-pointer">
                    <Mic className="h-4 w-4 text-blue-500" />
                    音声のみ
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                  <RadioGroupItem value="video" id="video" />
                  <Label htmlFor="video" className="flex items-center gap-2 cursor-pointer">
                    <Video className="h-4 w-4 text-blue-500" />
                    動画
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium">営業タイプ選択</h3>
              </div>
              <RadioGroup value={salesType} onValueChange={setSalesType} className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow flex-1">
                  <RadioGroupItem value="is" id="is" />
                  <Label htmlFor="is" className="flex flex-col cursor-pointer w-full">
                    <span className="font-medium">IS（インサイドセールス）</span>
                    <span className="text-xs text-muted-foreground">電話やオンラインでの営業活動</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow flex-1">
                  <RadioGroupItem value="fs" id="fs" />
                  <Label htmlFor="fs" className="flex flex-col cursor-pointer w-full">
                    <span className="font-medium">FS（フィールドセールス）</span>
                    <span className="text-xs text-muted-foreground">対面での営業活動</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium">シナリオ選択</h3>
              </div>
              <Select value={scenario} onValueChange={setScenario}>
                <SelectTrigger className="bg-white dark:bg-gray-800">
                  <SelectValue placeholder="シナリオを選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(scenarios).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {scenario && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg text-sm"
                >
                  <p className="font-medium mb-1">シナリオ概要:</p>
                  <p className="text-muted-foreground">
                    {scenario === "新規開拓電話" &&
                      "初めて接触する見込み顧客に対して、アポイントを獲得するための電話営業シナリオです。"}
                    {scenario === "反響対応" &&
                      "問い合わせや資料請求があった見込み顧客に対して、次のステップに進めるための対応シナリオです。"}
                    {scenario === "リード育成" &&
                      "既に接触のある見込み顧客に対して、関係性を深め、購買意欲を高めるためのフォローアップシナリオです。"}
                    {scenario === "受付突破" &&
                      "担当者につなげてもらうために、受付やゲートキーパーを通過するための電話営業シナリオです。"}
                    {scenario === "フォローアップ電話" &&
                      "過去に接触した見込み顧客に対して、状況確認や新たな提案を行うためのフォローアップシナリオです。"}
                    {scenario === "会社説明" &&
                      "自社の強みや特徴を効果的に伝えるための対面プレゼンテーションシナリオです。"}
                    {scenario === "ニーズ分析" &&
                      "顧客の課題や要望を深掘りし、適切なソリューションを提案するためのヒアリングシナリオです。"}
                    {scenario === "商品デモ" &&
                      "製品やサービスの機能や価値を実演して伝えるためのデモンストレーションシナリオです。"}
                    {scenario === "提案プレゼンテーション" &&
                      "顧客の課題解決に向けた具体的な提案を行うためのプレゼンテーションシナリオです。"}
                    {scenario === "クロージング技法" &&
                      "商談を成約に導くための効果的なクロージング手法を実践するシナリオです。"}
                    {scenario === "質疑応答" && "顧客からの質問や懸念に対して、適切に回答するためのQ&Aシナリオです。"}
                    {scenario === "総合ロールプレイ" &&
                      "一連の営業プロセスを通して、総合的な営業スキルを実践するシナリオです。"}
                  </p>
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-medium">顧客タイプ</h3>
                </div>
                <Select value={customerType} onValueChange={setCustomerType}>
                  <SelectTrigger className="bg-white dark:bg-gray-800">
                    <SelectValue placeholder="顧客タイプを選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(customerTypes).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {customerType && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 p-3 rounded-lg border shadow-sm"
                  >
                    <Badge className="mb-2 bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200">
                      {customerType.split("-")[0]}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {customerType === "分析的-詳細重視" && "データや詳細情報を重視し、論理的な説明を求める顧客です。"}
                      {customerType === "友好的-協力的" && "会話を楽しみ、協力的で関係構築を重視する顧客です。"}
                      {customerType === "懐疑的-慎重" && "提案に対して疑いを持ち、慎重に判断する顧客です。"}
                      {customerType === "多忙-時間重視" &&
                        "時間を非常に重視し、簡潔で要点を絞った説明を求める顧客です。"}
                      {customerType === "攻撃的-挑戦的" && "批判的で挑戦的な質問を投げかけ、対応力を試す顧客です。"}
                      {customerType === "優柔不断-躊躇" && "決断を先延ばしにし、多くの選択肢を求める顧客です。"}
                    </p>
                  </motion.div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-medium">役職・立場</h3>
                </div>
                <Select value={customerPosition} onValueChange={setCustomerPosition}>
                  <SelectTrigger className="bg-white dark:bg-gray-800">
                    <SelectValue placeholder="役職・立場を選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(customerPositions).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {customerPosition && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 p-3 rounded-lg border shadow-sm"
                  >
                    <Badge className="mb-2 bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200">
                      {customerPosition}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {customerPosition === "経営幹部" && "会社全体の戦略や財務に関心があり、ROIを重視します。"}
                      {customerPosition === "部門マネージャー" &&
                        "部門の目標達成や効率化に関心があり、具体的な成果を求めます。"}
                      {customerPosition === "現場スタッフ" &&
                        "日常業務の改善や使いやすさに関心があり、実用性を重視します。"}
                      {customerPosition === "受付-ゲートキーパー" &&
                        "関係者の時間を守ることが役割で、価値を見極めようとします。"}
                      {customerPosition === "主要意思決定者" && "最終決定権を持ち、全体的な価値と影響を評価します。"}
                      {customerPosition === "キーインフルエンサー" &&
                        "決定に影響力を持ち、専門的な観点から評価します。"}
                      {customerPosition === "技術専門家" &&
                        "技術的な詳細や仕様に関心があり、実装の実現性を重視します。"}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium">評価の厳格さ</h3>
                <Badge variant="outline" className="ml-auto">
                  レベル {evaluationLevel}
                </Badge>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <Slider
                  value={evaluationLevel}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={setEvaluationLevel}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>優しい</span>
                  <span>標準</span>
                  <span>厳しい</span>
                </div>
                <div className="mt-4 text-sm">
                  {evaluationLevel[0] === 1 && "基本的なフィードバックのみ。初心者向けの優しい評価です。"}
                  {evaluationLevel[0] === 2 && "主要な改善点に焦点を当てた評価です。"}
                  {evaluationLevel[0] === 3 && "バランスの取れた標準的な評価です。"}
                  {evaluationLevel[0] === 4 && "詳細な改善点を指摘する厳格な評価です。"}
                  {evaluationLevel[0] === 5 && "プロフェッショナルレベルを求める非常に厳しい評価です。"}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium">目標時間</h3>
                <Badge variant="outline" className="ml-auto">
                  {targetTime}分
                </Badge>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <Slider value={targetTime} min={5} max={30} step={1} onValueChange={setTargetTime} className="w-full" />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>5分</span>
                  <span>15分</span>
                  <span>30分</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTargetTime([5])}
                    className={targetTime[0] === 5 ? "border-blue-500 bg-blue-50 dark:bg-blue-900" : ""}
                  >
                    ショート (5分)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTargetTime([15])}
                    className={targetTime[0] === 15 ? "border-blue-500 bg-blue-50 dark:bg-blue-900" : ""}
                  >
                    スタンダード (15分)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTargetTime([30])}
                    className={targetTime[0] === 30 ? "border-blue-500 bg-blue-50 dark:bg-blue-900" : ""}
                  >
                    ロング (30分)
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium">研修テーマ・焦点</h3>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <div className="flex flex-wrap gap-2 mb-4">
                  {themeOptions.map((option) => (
                    <Badge
                      key={option}
                      variant="outline"
                      className={`cursor-pointer ${theme === option ? "bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : ""}`}
                      onClick={() => setTheme(option)}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="カスタムテーマを入力（例：反対意見対応の習得、価値提案の向上など）"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 dark:bg-gray-900 border-t p-4">
        <div className="flex items-center gap-2">
          {isFormValid ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200">
              設定完了
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-200">
              必須項目を入力してください
            </Badge>
          )}
        </div>
        <Button onClick={handleSubmit} disabled={!isFormValid} className="bg-blue-600 hover:bg-blue-700 gap-2">
          セッション開始
          <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </Button>
      </CardFooter>
    </Card>
  )
}
