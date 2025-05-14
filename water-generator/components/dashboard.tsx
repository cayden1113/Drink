"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Droplet, LineChart, UserCircle, Settings, Bluetooth, AlertTriangle } from "lucide-react"
import WaterGenerator from "./water-generator"
import HealthMetrics from "./health-metrics"
import UserProfile from "./user-profile"
import DeviceConnection from "./device-connection"
import RecommendationEngine from "./recommendation-engine"
import { useToast } from "@/hooks/use-toast"

// 模拟智能手环数据
const mockWristbandData = {
  heartRate: 72,
  steps: 8432,
  caloriesBurned: 1240,
  sleepHours: 6.5,
  hydrationLevel: 65,
  bodyTemperature: 36.7,
  bloodPressure: { systolic: 120, diastolic: 80 },
  oxygenSaturation: 98,
  stressLevel: 35,
}

export default function Dashboard() {
  const [isDeviceConnected, setIsDeviceConnected] = useState(false)
  const [wristbandData, setWristbandData] = useState(mockWristbandData)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [recommendations, setRecommendations] = useState<any>(null)
  const { toast } = useToast()

  // 模拟连接智能手环
  const connectDevice = () => {
    toast({
      title: "正在连接设备...",
      description: "请确保您的智能手环已开启并在范围内",
    })

    // 模拟连接延迟
    setTimeout(() => {
      setIsDeviceConnected(true)
      toast({
        title: "设备连接成功",
        description: "已成功连接到您的智能手环",
      })
    }, 2000)
  }

  // 模拟断开连接
  const disconnectDevice = () => {
    setIsDeviceConnected(false)
    toast({
      title: "设备已断开连接",
      description: "您的智能手环已断开连接",
      variant: "destructive",
    })
  }

  // 模拟数据更新
  useEffect(() => {
    if (!isDeviceConnected) return

    const interval = setInterval(() => {
      setWristbandData((prev) => ({
        ...prev,
        heartRate: Math.floor(prev.heartRate + (Math.random() * 4 - 2)),
        hydrationLevel: Math.max(0, Math.min(100, prev.hydrationLevel + (Math.random() * 6 - 3))),
        stressLevel: Math.max(0, Math.min(100, prev.stressLevel + (Math.random() * 8 - 4))),
        bodyTemperature: +(prev.bodyTemperature + (Math.random() * 0.4 - 0.2)).toFixed(1),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [isDeviceConnected])

  // 生成水分推荐
  useEffect(() => {
    if (isDeviceConnected) {
      const newRecommendations = RecommendationEngine.generateRecommendations(wristbandData)
      setRecommendations(newRecommendations)
    }
  }, [wristbandData, isDeviceConnected])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className={`${wristbandData.hydrationLevel < 50 ? "border-red-300 bg-red-50" : ""}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">水分水平</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Droplet
                className={`h-5 w-5 mr-2 ${wristbandData.hydrationLevel < 50 ? "text-red-500" : "text-blue-500"}`}
              />
              <span className="text-2xl font-bold">
                {isDeviceConnected ? `${wristbandData.hydrationLevel}%` : "--"}
              </span>
            </div>
            {wristbandData.hydrationLevel < 50 && isDeviceConnected && (
              <p className="text-xs text-red-500 mt-1 flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" /> 水分水平偏低
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">心率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-rose-500" />
              <span className="text-2xl font-bold">{isDeviceConnected ? `${wristbandData.heartRate} BPM` : "--"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">体温</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-amber-500" />
              <span className="text-2xl font-bold">
                {isDeviceConnected ? `${wristbandData.bodyTemperature}°C` : "--"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">压力水平</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-purple-500" />
              <span className="text-2xl font-bold">{isDeviceConnected ? `${wristbandData.stressLevel}%` : "--"}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">个人健康中心</h2>
        <Button
          variant={isDeviceConnected ? "destructive" : "default"}
          onClick={isDeviceConnected ? disconnectDevice : connectDevice}
          className="flex items-center"
        >
          <Bluetooth className="mr-2 h-4 w-4" />
          {isDeviceConnected ? "断开设备" : "连接智能手环"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="dashboard">
            <Activity className="mr-2 h-4 w-4" />
            健康数据
          </TabsTrigger>
          <TabsTrigger value="water">
            <Droplet className="mr-2 h-4 w-4" />
            水分定制
          </TabsTrigger>
          <TabsTrigger value="profile">
            <UserCircle className="mr-2 h-4 w-4" />
            个人档案
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            设备设置
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <HealthMetrics data={wristbandData} isConnected={isDeviceConnected} />
        </TabsContent>

        <TabsContent value="water">
          <WaterGenerator
            recommendations={recommendations}
            isDeviceConnected={isDeviceConnected}
            healthData={wristbandData}
          />
        </TabsContent>

        <TabsContent value="profile">
          <UserProfile />
        </TabsContent>

        <TabsContent value="settings">
          <DeviceConnection isConnected={isDeviceConnected} onConnect={connectDevice} onDisconnect={disconnectDevice} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
