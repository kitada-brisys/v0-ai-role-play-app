"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Clock, TrendingUp, Calendar, BarChart2 } from "lucide-react"

export default function HistoryDashboard() {
  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="summary">サマリー</TabsTrigger>
        <TabsTrigger value="scenarios">シナリオ別</TabsTrigger>
        <TabsTrigger value="skills">スキル別</TabsTrigger>
      </TabsList>

      <TabsContent value="summary">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均スコア</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78.5</div>
              <p className="text-xs text-muted-foreground">前月比 +2.5%</p>
              <Progress value={78.5} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">セッション数</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">今月: 12 / 先月: 12</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均時間</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14:30</div>
              <p className="text-xs text-muted-foreground">目標: 15:00</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">改善傾向</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+5.2%</div>
              <p className="text-xs text-muted-foreground">過去3ヶ月</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>最近の達成</CardTitle>
              <CardDescription>獲得したバッジとマイルストーン</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-500 hover:bg-blue-600">
                  <Award className="h-3 w-3 mr-1" /> 10セッション達成
                </Badge>
                <Badge className="bg-purple-500 hover:bg-purple-600">
                  <Award className="h-3 w-3 mr-1" /> クロージングマスター
                </Badge>
                <Badge className="bg-amber-500 hover:bg-amber-600">
                  <Award className="h-3 w-3 mr-1" /> ヒアリング上級者
                </Badge>
                <Badge className="bg-green-500 hover:bg-green-600">
                  <Award className="h-3 w-3 mr-1" /> 連続5回80点以上
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>次のマイルストーン</CardTitle>
              <CardDescription>達成目標</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">提案力マスター</span>
                    <span className="text-sm">1/3</span>
                  </div>
                  <Progress value={33} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">月間20セッション</span>
                    <span className="text-sm">12/20</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">総合スコア85+</span>
                    <span className="text-sm">78/85</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="scenarios">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>インサイドセールス (IS) シナリオ</CardTitle>
              <CardDescription>シナリオ別の平均スコアと実施回数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "新規開拓電話", score: 82, count: 8, color: "bg-blue-600" },
                  { name: "反響対応", score: 75, count: 5, color: "bg-green-600" },
                  { name: "リード育成", score: 90, count: 3, color: "bg-purple-600" },
                  { name: "受付突破", score: 68, count: 4, color: "bg-amber-600" },
                  { name: "フォローアップ電話", score: 85, count: 2, color: "bg-indigo-600" },
                ].map((scenario, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{scenario.name}</span>
                        <span className="text-xs text-muted-foreground">({scenario.count}回)</span>
                      </div>
                      <span className="text-sm font-medium">{scenario.score}点</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${scenario.color}`} style={{ width: `${scenario.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>フィールドセールス (FS) シナリオ</CardTitle>
              <CardDescription>シナリオ別の平均スコアと実施回数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "会社説明", score: 80, count: 3, color: "bg-blue-600" },
                  { name: "ニーズ分析", score: 68, count: 4, color: "bg-green-600" },
                  { name: "商品デモ", score: 75, count: 2, color: "bg-purple-600" },
                  { name: "提案プレゼンテーション", score: 72, count: 5, color: "bg-amber-600" },
                  { name: "クロージング技法", score: 85, count: 3, color: "bg-indigo-600" },
                  { name: "質疑応答", score: 78, count: 2, color: "bg-pink-600" },
                  { name: "総合ロールプレイ", score: 70, count: 1, color: "bg-teal-600" },
                ].map((scenario, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{scenario.name}</span>
                        <span className="text-xs text-muted-foreground">({scenario.count}回)</span>
                      </div>
                      <span className="text-sm font-medium">{scenario.score}点</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${scenario.color}`} style={{ width: `${scenario.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>シナリオ別改善傾向</CardTitle>
              <CardDescription>過去3ヶ月の改善率</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "新規開拓電話", improvement: "+8.2%", trend: "上昇中" },
                  { name: "ニーズ分析", improvement: "+5.5%", trend: "上昇中" },
                  { name: "提案プレゼンテーション", improvement: "+3.7%", trend: "上昇中" },
                  { name: "クロージング技法", improvement: "+10.2%", trend: "急上昇" },
                  { name: "受付突破", improvement: "-2.1%", trend: "下降中" },
                  { name: "質疑応答", improvement: "+1.8%", trend: "横ばい" },
                ].map((item, index) => (
                  <Card key={index} className="bg-gray-50 dark:bg-gray-900 border">
                    <CardContent className="p-4">
                      <div className="font-medium">{item.name}</div>
                      <div
                        className={`text-lg font-bold ${
                          item.improvement.startsWith("+")
                            ? "text-green-600"
                            : item.improvement === "0%"
                              ? "text-gray-600"
                              : "text-red-600"
                        }`}
                      >
                        {item.improvement}
                      </div>
                      <div className="text-xs text-muted-foreground">{item.trend}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="skills">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>スキル別評価</CardTitle>
              <CardDescription>各スキルの平均スコア</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "オープニング", score: 85, color: "bg-blue-600" },
                  { name: "コミュニケーションスキル", score: 75, color: "bg-green-600" },
                  { name: "ヒアリング力", score: 82, color: "bg-purple-600" },
                  { name: "提案力", score: 70, color: "bg-amber-600" },
                  { name: "抵抗処理・反論対応", score: 65, color: "bg-red-600" },
                  { name: "クロージング", score: 90, color: "bg-indigo-600" },
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm font-medium">{skill.score}点</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${skill.color}`} style={{ width: `${skill.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>スキル改善傾向</CardTitle>
              <CardDescription>過去3ヶ月の改善率</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "オープニング", current: 85, previous: 78, trend: "+7" },
                  { name: "コミュニケーションスキル", current: 75, previous: 72, trend: "+3" },
                  { name: "ヒアリング力", current: 82, previous: 75, trend: "+7" },
                  { name: "提案力", current: 70, previous: 65, trend: "+5" },
                  { name: "抵抗処理・反論対応", current: 65, previous: 58, trend: "+7" },
                  { name: "クロージング", current: 90, previous: 85, trend: "+5" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{item.name}</span>
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

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>スキル詳細分析</CardTitle>
              <CardDescription>スキル要素別の評価</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">ヒアリング力の詳細</h4>
                  <div className="space-y-3">
                    {[
                      { name: "オープンクエスチョン", score: 85 },
                      { name: "5W1H網羅", score: 75 },
                      { name: "課題の深掘り", score: 80 },
                      { name: "アクティブリスニング", score: 90 },
                      { name: "Whyクエスチョン", score: 70 },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{item.name}</span>
                          <span className="text-sm font-medium">{item.score}点</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${item.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">提案力の詳細</h4>
                  <div className="space-y-3">
                    {[
                      { name: "論理的マッピング", score: 75 },
                      { name: "定量的説明", score: 65 },
                      { name: "バリュープロポジション", score: 70 },
                      { name: "リスク対策提示", score: 60 },
                      { name: "ストーリーテリング", score: 80 },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{item.name}</span>
                          <span className="text-sm font-medium">{item.score}点</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${item.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}
