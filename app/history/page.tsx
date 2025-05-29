"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Search } from "lucide-react"
import HistoryDashboard from "@/components/history-dashboard"

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("history")
  const [selectedSession, setSelectedSession] = useState<string | null>(null)

  // モックデータ
  const sessions = [
    {
      id: "1",
      date: "2023-05-28",
      time: "14:30",
      type: "IS",
      scenario: "新規開拓電話",
      format: "音声",
      customerProfile: "分析的・詳細重視 / 部門マネージャー",
      duration: "12:45",
      score: 85,
    },
    {
      id: "2",
      date: "2023-05-27",
      time: "10:15",
      type: "FS",
      scenario: "提案プレゼンテーション",
      format: "動画",
      customerProfile: "懐疑的・慎重 / 経営幹部",
      duration: "18:22",
      score: 72,
    },
    {
      id: "3",
      date: "2023-05-25",
      time: "16:00",
      type: "IS",
      scenario: "リード育成",
      format: "音声",
      customerProfile: "友好的・協力的 / 現場スタッフ",
      duration: "08:10",
      score: 90,
    },
    {
      id: "4",
      date: "2023-05-23",
      time: "11:45",
      type: "FS",
      scenario: "ニーズ分析",
      format: "動画",
      customerProfile: "多忙・時間重視 / 主要意思決定者",
      duration: "15:30",
      score: 68,
    },
    {
      id: "5",
      date: "2023-05-20",
      time: "09:30",
      type: "IS",
      scenario: "受付突破",
      format: "音声",
      customerProfile: "攻撃的・挑戦的 / 受付・ゲートキーパー",
      duration: "05:15",
      score: 75,
    },
  ]

  if (selectedSession) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setSelectedSession(null)}>
                ← 戻る
              </Button>
              <div>
                <CardTitle>セッション詳細</CardTitle>
                <CardDescription>セッションID: {selectedSession}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* セッション基本情報 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">85</div>
                      <div className="text-sm text-muted-foreground">総合スコア</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-xl font-bold">12:45</div>
                      <div className="text-sm text-muted-foreground">セッション時間</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">新規開拓電話</div>
                      <div className="text-sm text-muted-foreground">シナリオ</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* タブ切り替え */}
              <Tabs defaultValue="evaluation" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="evaluation">総合評価</TabsTrigger>
                  <TabsTrigger value="conversation">会話記録</TabsTrigger>
                  <TabsTrigger value="feedback">フィードバック</TabsTrigger>
                </TabsList>

                <TabsContent value="evaluation" className="space-y-6">
                  {/* カテゴリー別評価 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>カテゴリー別評価</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { name: "オープニング", score: 85, color: "bg-blue-500" },
                          { name: "コミュニケーションスキル", score: 75, color: "bg-green-500" },
                          { name: "ヒアリング力", score: 82, color: "bg-purple-500" },
                          { name: "提案力", score: 70, color: "bg-amber-500" },
                          { name: "抵抗処理・反論対応", score: 65, color: "bg-red-500" },
                          { name: "クロージング", score: 90, color: "bg-indigo-500" },
                        ].map((category, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">{category.name}</span>
                              <span className="text-sm font-bold">{category.score}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className={`h-3 rounded-full transition-all duration-500 ${category.color}`}
                                style={{ width: `${category.score}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 詳細評価表 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>詳細評価項目</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
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
                            {[
                              {
                                category: "オープニング",
                                item: "発話開始から3秒以内に自己紹介を開始しているか",
                                score: "良好",
                                note: "適切なタイミングで開始",
                              },
                              {
                                category: "オープニング",
                                item: "会社名・所属部署・役職を簡潔に伝えているか",
                                score: "良好",
                                note: "明確に伝達",
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
                              {
                                category: "ヒアリング力",
                                item: "5W1Hを網羅する質問を行っているか",
                                score: "要改善",
                                note: "Whyの質問が不足",
                              },
                              {
                                category: "提案力",
                                item: "ヒアリング結果とソリューションを論理的にマッピングして示しているか",
                                score: "良好",
                                note: "論理的な提案",
                              },
                              {
                                category: "提案力",
                                item: "提案が顧客のKPIにどのように影響するかを定量的に説明しているか",
                                score: "要改善",
                                note: "定量的説明が不足",
                              },
                              {
                                category: "クロージング",
                                item: "次のステップを具体的に提案しているか",
                                score: "良好",
                                note: "明確な次のステップ提案",
                              },
                            ].map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{item.category}</TableCell>
                                <TableCell className="text-sm">{item.item}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant={item.score === "良好" ? "default" : "destructive"}
                                    className={
                                      item.score === "良好"
                                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                                        : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                    }
                                  >
                                    {item.score}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm">{item.note}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="conversation" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>会話記録</CardTitle>
                      <CardDescription>AIとの会話ログと発話タイミング</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 max-h-[500px] overflow-y-auto">
                        {[
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
                          {
                            role: "ai",
                            content:
                              "なるほど、データ分析の効率化ですね。弊社のソリューションでは、分析時間を最大70%短縮できます。",
                            timestamp: "00:00:55",
                          },
                        ].map((message, index) => (
                          <div
                            key={index}
                            className={`flex ${message.role === "ai" ? "justify-start" : "justify-end"}`}
                          >
                            <div
                              className={`max-w-[80%] p-4 rounded-lg ${
                                message.role === "ai"
                                  ? "bg-blue-100 dark:bg-blue-900 text-left"
                                  : "bg-gray-100 dark:bg-gray-800 text-right"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-medium">
                                  {message.role === "ai" ? "AI顧客" : "営業担当"}
                                </span>
                                <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                              </div>
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="feedback" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-700">強み</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                            <span className="text-sm">オープニングでの自己紹介と会社紹介が簡潔で効果的でした。</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                            <span className="text-sm">クロージングでの次のステップ提案が明確で良かったです。</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                            <span className="text-sm">顧客の質問に対して迅速に回答できていました。</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-amber-700">改善点</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                            <span className="text-sm">顧客の懸念に対する共感が不足している場面がありました。</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                            <span className="text-sm">提案の価値を定量的に示す部分が弱かったです。</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                            <span className="text-sm">専門用語の使用が多く、顧客視点での説明が必要です。</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>次回への提案</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                            1
                          </div>
                          <span className="text-sm">
                            顧客の発言に対して「なるほど、〜ということですね」と言い換えて理解を示す練習をしましょう。
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                            2
                          </div>
                          <span className="text-sm">
                            提案内容が顧客のビジネスにどのような定量的効果をもたらすか、数値で示す準備をしましょう。
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                            3
                          </div>
                          <span className="text-sm">
                            専門用語を使う前に「〜という技術があります。これは簡単に言うと〜です」と説明を加えましょう。
                          </span>
                        </li>
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Tabs defaultValue="history" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="history">履歴・結果</TabsTrigger>
          <TabsTrigger value="trends">進歩傾向</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <HistoryDashboard />

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>ロールプレイ履歴</CardTitle>
              <CardDescription>過去のセッション結果を確認できます</CardDescription>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="検索..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="営業タイプ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="is">IS</SelectItem>
                      <SelectItem value="fs">FS</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="形式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="audio">音声</SelectItem>
                      <SelectItem value="video">動画</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>日時</TableHead>
                      <TableHead>タイプ</TableHead>
                      <TableHead className="hidden md:table-cell">シナリオ</TableHead>
                      <TableHead className="hidden md:table-cell">形式</TableHead>
                      <TableHead className="hidden lg:table-cell">顧客プロフィール</TableHead>
                      <TableHead>時間</TableHead>
                      <TableHead>スコア</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>
                          {session.date}
                          <br />
                          <span className="text-xs text-muted-foreground">{session.time}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={session.type === "IS" ? "default" : "secondary"}>{session.type}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{session.scenario}</TableCell>
                        <TableCell className="hidden md:table-cell">{session.format}</TableCell>
                        <TableCell className="hidden lg:table-cell">{session.customerProfile}</TableCell>
                        <TableCell>{session.duration}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              session.score >= 80
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : session.score >= 60
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                            }`}
                          >
                            {session.score}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedSession(session.id)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">詳細を見る</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>スキル開発傾向</CardTitle>
                <CardDescription>過去3ヶ月のスキル別スコア推移</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { skill: "オープニング", current: 85, previous: 78, trend: "+7" },
                    { skill: "ヒアリング力", current: 82, previous: 75, trend: "+7" },
                    { skill: "提案力", current: 70, previous: 65, trend: "+5" },
                    { skill: "抵抗処理", current: 65, previous: 58, trend: "+7" },
                    { skill: "クロージング", current: 90, previous: 85, trend: "+5" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{item.skill}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{item.current}%</span>
                            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">{item.trend}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${item.current}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>月次進捗</CardTitle>
                <CardDescription>月別の平均スコアと実施回数</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "5月", score: 78.5, sessions: 12, improvement: "+2.5%" },
                    { month: "4月", score: 76.0, sessions: 15, improvement: "+4.2%" },
                    { month: "3月", score: 71.8, sessions: 18, improvement: "+1.8%" },
                    { month: "2月", score: 70.0, sessions: 10, improvement: "-" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{item.month}</div>
                        <div className="text-sm text-muted-foreground">{item.sessions}セッション</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{item.score}</div>
                        <div className={`text-sm ${item.improvement !== "-" ? "text-green-600" : "text-gray-500"}`}>
                          {item.improvement}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>達成したマイルストーンとバッジ</CardTitle>
                <CardDescription>学習の成果と獲得した称号</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">最近の達成</h4>
                    <div className="space-y-3">
                      {[
                        {
                          badge: "クロージングマスター",
                          description: "クロージングで5回連続80点以上",
                          date: "2023-05-28",
                          color: "bg-purple-500",
                        },
                        {
                          badge: "ヒアリング上級者",
                          description: "ヒアリング力で90点以上を達成",
                          date: "2023-05-25",
                          color: "bg-amber-500",
                        },
                        {
                          badge: "10セッション達成",
                          description: "月間10セッション完了",
                          date: "2023-05-20",
                          color: "bg-blue-500",
                        },
                      ].map((achievement, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className={`w-3 h-3 rounded-full ${achievement.color} mt-1.5`} />
                          <div className="flex-1">
                            <div className="font-medium">{achievement.badge}</div>
                            <div className="text-sm text-muted-foreground">{achievement.description}</div>
                            <div className="text-xs text-muted-foreground mt-1">{achievement.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">次のマイルストーン</h4>
                    <div className="space-y-3">
                      {[
                        {
                          target: "提案力マスター",
                          description: "提案力で85点以上を3回達成",
                          progress: 1,
                          total: 3,
                          color: "bg-green-500",
                        },
                        {
                          target: "月間20セッション",
                          description: "1ヶ月で20セッション完了",
                          progress: 12,
                          total: 20,
                          color: "bg-blue-500",
                        },
                        {
                          target: "総合スコア85+",
                          description: "総合スコア85点以上を達成",
                          progress: 78,
                          total: 85,
                          color: "bg-purple-500",
                        },
                      ].map((milestone, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{milestone.target}</div>
                            <div className="text-sm text-muted-foreground">
                              {milestone.progress}/{milestone.total}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">{milestone.description}</div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${milestone.color}`}
                              style={{ width: `${(milestone.progress / milestone.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>学習統計</CardTitle>
                <CardDescription>全体的な学習パフォーマンス</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <div className="text-sm text-muted-foreground">総セッション数</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">18:30</div>
                    <div className="text-sm text-muted-foreground">総学習時間</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">6</div>
                    <div className="text-sm text-muted-foreground">獲得バッジ数</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">+5.2%</div>
                    <div className="text-sm text-muted-foreground">3ヶ月改善率</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
