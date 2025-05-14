"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Save, Beaker, Heart, AlertTriangle, Check } from "lucide-react"
import WaterVisualization from "./water-visualization"
import { useToast } from "@/hooks/use-toast"

// 定义微量元素及其属性
const traceElements = [
  {
    id: "magnesium",
    name: "镁",
    color: "#a3e635",
    benefits: "支持肌肉和神经功能，能量产生和骨骼健康",
    defaultLevel: 10,
    maxLevel: 50,
    unit: "mg/L",
    healthConditions: ["肌肉疲劳", "压力", "运动恢复"],
  },
  {
    id: "calcium",
    name: "钙",
    color: "#d1d5db",
    benefits: "对骨骼健康，肌肉功能和神经传导至关重要",
    defaultLevel: 20,
    maxLevel: 100,
    unit: "mg/L",
    healthConditions: ["骨骼健康", "肌肉收缩", "神经传导"],
  },
  {
    id: "potassium",
    name: "钾",
    color: "#fbbf24",
    benefits: "调节体液平衡，肌肉收缩和神经信号",
    defaultLevel: 5,
    maxLevel: 30,
    unit: "mg/L",
    healthConditions: ["血压调节", "肌肉功能", "心脏健康"],
  },
  {
    id: "sodium",
    name: "钠",
    color: "#f87171",
    benefits: "维持体液平衡并支持神经和肌肉功能",
    defaultLevel: 10,
    maxLevel: 40,
    unit: "mg/L",
    healthConditions: ["体液平衡", "电解质", "神经功能"],
  },
  {
    id: "zinc",
    name: "锌",
    color: "#60a5fa",
    benefits: "支持免疫功能，伤口愈合和DNA合成",
    defaultLevel: 2,
    maxLevel: 15,
    unit: "mg/L",
    healthConditions: ["免疫系统", "伤口愈合", "细胞生长"],
  },
  {
    id: "selenium",
    name: "硒",
    color: "#c084fc",
    benefits: "抗氧化剂，有助于保护细胞免受损害",
    defaultLevel: 1,
    maxLevel: 10,
    unit: "μg/L",
    healthConditions: ["抗氧化", "甲状腺功能", "免疫系统"],
  },
  {
    id: "electrolytes",
    name: "电解质混合物",
    color: "#34d399",
    benefits: "平衡体液，支持神经和肌肉功能",
    defaultLevel: 15,
    maxLevel: 60,
    unit: "mg/L",
    healthConditions: ["运动恢复", "水合作用", "肌肉功能"],
  },
  {
    id: "vitamin_b",
    name: "维生素B族",
    color: "#818cf8",
    benefits: "支持能量代谢和神经系统健康",
    defaultLevel: 3,
    maxLevel: 20,
    unit: "mg/L",
    healthConditions: ["能量水平", "神经系统", "代谢"],
  },
]

interface WaterGeneratorProps {
  recommendations?: any
  isDeviceConnected: boolean
  healthData: any
}

export default function WaterGenerator({ recommendations, isDeviceConnected, healthData }: WaterGeneratorProps) {
  const [elementLevels, setElementLevels] = useState(
    traceElements.reduce(
      (acc, element) => {
        acc[element.id] = element.defaultLevel
        return acc
      },
      {} as Record<string, number>,
    ),
  )

  const [savedRecipes, setSavedRecipes] = useState<
    Array<{ name: string; levels: Record<string, number>; forCondition?: string }>
  >([])
  const [recipeName, setRecipeName] = useState("我的定制水")
  const { toast } = useToast()

  // 当有推荐时更新元素水平
  useEffect(() => {
    if (recommendations) {
      setElementLevels(recommendations.elementLevels)
      setRecipeName(recommendations.name)
    }
  }, [recommendations])

  const handleSliderChange = (elementId: string, value: number[]) => {
    setElementLevels((prev) => ({
      ...prev,
      [elementId]: value[0],
    }))
  }

  const saveRecipe = () => {
    const newRecipe = {
      name: recipeName,
      levels: { ...elementLevels },
      forCondition: recommendations?.forCondition,
    }
    setSavedRecipes([...savedRecipes, newRecipe])

    toast({
      title: "配方已保存",
      description: `"${recipeName}" 已添加到您的保存配方中`,
    })
  }

  const resetLevels = () => {
    if (recommendations) {
      setElementLevels(recommendations.elementLevels)
      setRecipeName(recommendations.name)
    } else {
      setElementLevels(
        traceElements.reduce(
          (acc, element) => {
            acc[element.id] = element.defaultLevel
            return acc
          },
          {} as Record<string, number>,
        ),
      )
      setRecipeName("我的定制水")
    }
  }

  const applyRecommendedLevels = () => {
    if (recommendations) {
      setElementLevels(recommendations.elementLevels)
      setRecipeName(recommendations.name)

      toast({
        title: "已应用推荐配方",
        description: "基于您的健康数据的个性化配方已应用",
      })
    }
  }

  return (
    <div className="space-y-8">
      {isDeviceConnected && recommendations && (
        <Alert className="bg-blue-50 border-blue-200">
          <Check className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">个性化水分推荐</AlertTitle>
          <AlertDescription className="text-blue-700">
            基于您的生理数据，我们推荐 "{recommendations.name}" 配方，特别适合您当前的 {recommendations.forCondition}{" "}
            状况。
          </AlertDescription>
          <Button
            variant="outline"
            className="mt-2 bg-white border-blue-300 text-blue-700 hover:bg-blue-50"
            onClick={applyRecommendedLevels}
          >
            应用推荐配方
          </Button>
        </Alert>
      )}

      {!isDeviceConnected && (
        <Alert variant="destructive" className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">设备未连接</AlertTitle>
          <AlertDescription className="text-amber-700">连接您的智能手环以获取个性化水分推荐。</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>微量元素调整</CardTitle>
            <CardDescription>根据您的需求调整水中的微量元素含量</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {traceElements.map((element) => (
              <div key={element.id} className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {element.name}
                    </label>
                    {recommendations?.highlightedElements?.includes(element.id) && (
                      <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">推荐</Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {elementLevels[element.id]} {element.unit}
                  </span>
                </div>
                <Slider
                  value={[elementLevels[element.id]]}
                  max={element.maxLevel}
                  step={1}
                  onValueChange={(value) => handleSliderChange(element.id, value)}
                  className={recommendations?.highlightedElements?.includes(element.id) ? "accent-green-500" : ""}
                />
                <p className="text-xs text-muted-foreground">{element.benefits}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetLevels}>
              重置
            </Button>
            <Button onClick={saveRecipe}>
              <Save className="mr-2 h-4 w-4" />
              保存配方
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>您的定制水</CardTitle>
            <CardDescription>
              <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                className="w-full bg-transparent border-b border-muted focus:border-primary outline-none"
              />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <WaterVisualization elements={traceElements} levels={elementLevels} />

            <div className="mt-6 w-full">
              <h3 className="text-sm font-medium mb-2">成分组成:</h3>
              <div className="flex flex-wrap gap-2">
                {traceElements.map(
                  (element) =>
                    elementLevels[element.id] > 0 && (
                      <Badge
                        key={element.id}
                        style={{
                          backgroundColor: element.color,
                          color: "#000",
                          opacity: recommendations?.highlightedElements?.includes(element.id) ? 1 : 0.7,
                        }}
                      >
                        {element.name}: {elementLevels[element.id]} {element.unit}
                      </Badge>
                    ),
                )}
              </div>
            </div>

            {isDeviceConnected && healthData && (
              <div className="mt-6 w-full">
                <h3 className="text-sm font-medium mb-2">健康益处:</h3>
                <div className="text-sm space-y-2">
                  {healthData.hydrationLevel < 70 && (
                    <div className="flex items-start">
                      <Beaker className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                      <span>提高水分水平 ({healthData.hydrationLevel}%)</span>
                    </div>
                  )}
                  {healthData.stressLevel > 50 && (
                    <div className="flex items-start">
                      <Heart className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                      <span>帮助缓解压力 ({healthData.stressLevel}%)</span>
                    </div>
                  )}
                  {healthData.heartRate > 80 && (
                    <div className="flex items-start">
                      <Heart className="h-4 w-4 mr-2 text-rose-500 mt-0.5" />
                      <span>支持心血管健康 ({healthData.heartRate} BPM)</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              <Heart className="inline-block mr-1 h-4 w-4 text-red-500" />
              基于您的选择的健康益处
            </div>
          </CardFooter>
        </Card>
      </div>

      {savedRecipes.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>已保存的配方</CardTitle>
            <CardDescription>您的自定义水配方</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedRecipes.map((recipe, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{recipe.name}</h3>
                    </div>
                    {recipe.forCondition && (
                      <Badge className="mt-1 bg-green-100 text-green-800">适合: {recipe.forCondition}</Badge>
                    )}
                    <div className="mt-2 text-xs text-muted-foreground">
                      {Object.entries(recipe.levels)
                        .filter(([_, value]) => value > 0)
                        .map(([key, value]) => {
                          const element = traceElements.find((e) => e.id === key)
                          return `${element?.name}: ${value}`
                        })
                        .join(", ")}
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setElementLevels(recipe.levels)
                        setRecipeName(recipe.name)
                      }}
                    >
                      <Beaker className="mr-2 h-4 w-4" />
                      应用配方
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
