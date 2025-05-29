"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Download, Share2 } from "lucide-react"

interface RoleplayResultsProps {
  settings: any
  onNewSession: () => void
}

export default function RoleplayResults({ settings, onNewSession }: RoleplayResultsProps) {
  const [activeTab, setActiveTab] = useState("summary")

  // モックデータ - 実際のアプリでは評価結果がここに入る
  const evaluationData = {
    totalScore: 78,
    categories: [
      { name: "オープニング", score: 85 },
      { name: "コミュニケーションスキル", score: 75 },
      { name: "ヒアリング力", score: 82 },
      { name: "提案力", score: 70 },
      { name: "抵抗処理・反論対応", score: 65 },
      { name: "クロージング", score: 90 },
    ],
    feedback: [
      "オープニングでの自己紹介と会社紹介が簡潔で効果的でした。",
      "顧客の懸念に対する共感が不足している場面がありました。",
      "提案の価値を定量的に示す部分が弱かったです。",
      "クロージングでの次のステップ提案が明確で良かったです。",
      "専門用語の使用が多く、顧客視点での説明が必要です。",
    ],
    conversation: [
      {
        role: "ai",
        content: "こんにちは、私はAIアシスタントです。今日はどのようなお手伝いができますか？",
        timestamp: "00:00:05",
      },
      {
        role: "user",
        content: "こんにちは、御社の製品に興味があります。もう少し詳しく教えていただけますか？",
        timestamp: "00:00:15",
      },
      {
        role: "ai",
        content:
          "ありがとうございます。弊社の製品は業務効率を30%向上させる実績があります。具体的にはどのような課題をお持ちですか？",
        timestamp: "00:00:25",
      },
      {
        role: "user",
        content: "現在、データ分析に時間がかかっており、もっと効率化したいと考えています。",
        timestamp: "00:00:40",
      },
    ],
    evaluationDetails: [
      { category: "オープニング", item: "自己紹介＆会社紹介", score: "良好", note: "簡潔に伝えられていた" },
      {
        category: "オープニング",
        item: "会社名・所属部署・役職を簡潔に伝えているか",
        score: "良好",
        note: "明確に伝えていた",
      },
      {
        category: "オープニング",
        item: "顧客業界に関連する実績や導入事例を1つ具体的に示しているか",
        score: "要改善",
        note: "具体例が不足",
      },
      {
        category: "コア進行",
        item: "声の速度（WPM：120～150）で適切に話しているか",
        score: "良好",
        note: "適切なペース",
      },
      {
        category: "コア進行",
        item: "語尾が尻すぼみにならず、明瞭に話し切っているか",
        score: "要改善",
        note: "語尾が弱い場面あり",
      },
      {
        category: "ヒアリング力",
        item: "オープンクエスチョンの割合が50%以上あるか",
        score: "良好",
        note: "適切な質問構成",
      },
      { category: "ヒアリング力", item: "5W1Hを網羅する質問を行っているか", score: "要改善", note: "Whyの質問が不足" },
      {
        category: "提案力",
        item: "ヒアリング結果とソリューションを論理的にマッピングして示しているか",
        score: "良好",
        note: "論理的な提案",
      },
      {
        category: "提案力",
        item: "提案が顧客のKPIにどのように影響するかを定量的に説明しているか（ROI試算）",
        score: "要改善",
        note: "定量的説明が不足",
      },
      {
        category: "クロージング＆フォローアップ",
        item: "次のステップ（デモ日程／契約締結など）を具体的に提案しているか",
        score: "良好",
        note: "明確な次のステップ提案",
      },
    ],
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader className="bg-blue-50 dark:bg-blue-950">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">ロールプレイ結果</CardTitle>
              <CardDescription>
                {settings.salesType === "is" ? "インサイドセールス" : "フィールドセールス"} - {settings.scenario}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> 保存
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" /> 共有
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 rounded-none">
              <TabsTrigger value="summary">総合評価</TabsTrigger>
              <TabsTrigger value="conversation">会話記録</TabsTrigger>
              <TabsTrigger value="feedback">フィードバック</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-950 rounded-lg border">
                    <h3 className="text-lg font-medium mb-2">総合スコア</h3>
                    <div className="relative w-40 h-40 mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold">{evaluationData.totalScore}</span>
                      </div>
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={
                            evaluationData.totalScore >= 80
                              ? "#10b981"
                              : evaluationData.totalScore >= 60
                                ? "#f59e0b"
                                : "#ef4444"
                          }
                          strokeWidth="10"
                          strokeDasharray={`${evaluationData.totalScore * 2.83} 283`}
                          strokeDashoffset="0"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {evaluationData.totalScore >= 80
                        ? "優れたパフォーマンス"
                        : evaluationData.totalScore >= 60
                          ? "良好なパフォーマンス"
                          : "改善が必要"}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="bg-white dark:bg-gray-950 rounded-lg border p-6">
                    <h3 className="text-lg font-medium mb-4">カテゴリー別評価</h3>
                    <div className="space-y-4">
                      {evaluationData.categories.map((category, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{category.name}</span>
                            <span className="text-sm font-medium">{category.score}%</span>
                          </div>
                          <Progress value={category.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>詳細評価</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[150px]">分類</TableHead>
                            <TableHead>評価項目</TableHead>
                            <TableHead className="w-[100px]">評価</TableHead>
                            <TableHead>メモ</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {evaluationData.evaluationDetails.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{item.category}</TableCell>
                              <TableCell>{item.item}</TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    item.score === "良好"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                      : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                                  }`}
                                >
                                  {item.score}
                                </span>
                              </TableCell>
                              <TableCell>{item.note}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="conversation" className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle>会話記録</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      {evaluationData.conversation.map((message, index) => (
                        <div key={index} className={`flex ${message.role === "ai" ? "justify-start" : "justify-end"}`}>
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.role === "ai"
                                ? "bg-blue-100 dark:bg-blue-900 text-left"
                                : "bg-gray-100 dark:bg-gray-800 text-right"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle>AIフィードバック</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">強み</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>オープニングでの自己紹介と会社紹介が簡潔で効果的でした。</li>
                        <li>クロージングでの次のステップ提案が明確で良かったです。</li>
                        <li>顧客の質問に対して迅速に回答できていました。</li>
                      </ul>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">改善点</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>顧客の懸念に対する共感が不足している場面がありました。</li>
                        <li>提案の価値を定量的に示す部分が弱かったです。</li>
                        <li>専門用語の使用が多く、顧客視点での説明が必要です。</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">次回への提案</h3>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>
                          顧客の発言に対して「なるほど、〜ということですね」と言い換えて理解を示す練習をしましょう。
                        </li>
                        <li>
                          提案内容が顧客のビジネスにどのような定量的効果をもたらすか、数値で示す準備をしましょう。
                        </li>
                        <li>
                          専門用語を使う前に「〜という技術があります。これは簡単に言うと〜です」と説明を加えましょう。
                        </li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between bg-gray-50 dark:bg-gray-900">
          <Button variant="outline" onClick={onNewSession}>
            <ArrowLeft className="mr-2 h-4 w-4" /> 新しいセッション
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
