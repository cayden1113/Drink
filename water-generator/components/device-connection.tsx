"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bluetooth, RefreshCw, Check, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface DeviceConnectionProps {
  isConnected: boolean
  onConnect: () => void
  onDisconnect: () => void
}

export default function DeviceConnection({ isConnected, onConnect, onDisconnect }: DeviceConnectionProps) {
  const [scanning, setScanning] = useState(false)
  const [availableDevices, setAvailableDevices] = useState<string[]>([])

  // 模拟扫描设备
  const scanForDevices = () => {
    setScanning(true)
    setAvailableDevices([])

    // 模拟延迟发现设备
    setTimeout(() => {
      setAvailableDevices(["智能手环 Pro", "健康监测器 X1", "生物指标追踪器"])
      setScanning(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>设备连接</CardTitle>
          <CardDescription>管理您的智能手环连接</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isConnected ? (
            <Alert className="bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">设备已连接</AlertTitle>
              <AlertDescription className="text-green-700">您的智能手环已成功连接并正在传输数据。</AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-amber-50 border-amber-200">
              <Info className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">未连接设备</AlertTitle>
              <AlertDescription className="text-amber-700">
                连接您的智能手环以获取实时健康数据和个性化水分推荐。
              </AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Bluetooth className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">智能手环</h3>
                <p className="text-sm text-muted-foreground">{isConnected ? "已连接" : "未连接"}</p>
              </div>
            </div>
            <Button variant={isConnected ? "destructive" : "default"} onClick={isConnected ? onDisconnect : onConnect}>
              {isConnected ? "断开连接" : "连接"}
            </Button>
          </div>

          {!isConnected && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">可用设备</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={scanForDevices}
                  disabled={scanning}
                  className="flex items-center"
                >
                  {scanning ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      扫描中...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      扫描设备
                    </>
                  )}
                </Button>
              </div>

              {scanning ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-500 mb-2" />
                  <p className="text-muted-foreground">正在扫描附近的设备...</p>
                </div>
              ) : availableDevices.length > 0 ? (
                <div className="space-y-2">
                  {availableDevices.map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center">
                        <Bluetooth className="h-5 w-5 text-blue-500 mr-3" />
                        <span>{device}</span>
                      </div>
                      <Button size="sm" onClick={onConnect}>
                        连接
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>未发现设备</p>
                  <p className="text-sm mt-1">请确保您的设备已开启并在范围内</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <h3 className="text-sm font-medium mb-2">连接说明</h3>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>确保您的智能手环已充电并开启</li>
            <li>在手环上启用蓝牙功能</li>
            <li>将手环靠近您的设备</li>
            <li>点击"扫描设备"按钮</li>
            <li>从列表中选择您的设备并点击"连接"</li>
          </ol>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>设备设置</CardTitle>
          <CardDescription>自定义您的智能手环设置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">数据同步频率</h3>
              <p className="text-xs text-muted-foreground">设备与应用同步数据的频率</p>
            </div>
            <select className="border rounded p-1 text-sm">
              <option>实时</option>
              <option>每5分钟</option>
              <option>每15分钟</option>
              <option>每30分钟</option>
              <option>每小时</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">心率监测</h3>
              <p className="text-xs text-muted-foreground">设备监测心率的频率</p>
            </div>
            <select className="border rounded p-1 text-sm">
              <option>连续</option>
              <option>每5分钟</option>
              <option>每15分钟</option>
              <option>每30分钟</option>
              <option>手动</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">振动提醒</h3>
              <p className="text-xs text-muted-foreground">设备是否在提醒时振动</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded">开启</button>
              <button className="px-3 py-1 text-sm border rounded">关闭</button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">电池节省模式</h3>
              <p className="text-xs text-muted-foreground">减少数据收集频率以延长电池寿命</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border rounded">开启</button>
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded">关闭</button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>保存设置</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
