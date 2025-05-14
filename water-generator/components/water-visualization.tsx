"use client"

import { useEffect, useRef } from "react"
import { Droplet } from "lucide-react"

interface Element {
  id: string
  name: string
  color: string
  maxLevel: number
}

interface WaterVisualizationProps {
  elements: Element[]
  levels: Record<string, number>
}

export default function WaterVisualization({ elements, levels }: WaterVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 绘制水基础
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2,
    )
    gradient.addColorStop(0, "rgba(232, 245, 254, 0.9)")
    gradient.addColorStop(1, "rgba(224, 242, 254, 0.7)")

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.ellipse(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, canvas.height / 2 - 10, 0, 0, 2 * Math.PI)
    ctx.fill()

    // 为每个元素绘制粒子
    elements.forEach((element) => {
      const level = levels[element.id]
      if (level <= 0) return

      const particleCount = Math.floor((level / element.maxLevel) * 50) + 5

      ctx.fillStyle = element.color

      for (let i = 0; i < particleCount; i++) {
        // 椭圆内的随机位置
        const angle = Math.random() * 2 * Math.PI
        const radiusX = (Math.random() * 0.8 + 0.1) * (canvas.width / 2 - 20)
        const radiusY = (Math.random() * 0.8 + 0.1) * (canvas.height / 2 - 20)

        const x = canvas.width / 2 + radiusX * Math.cos(angle)
        const y = canvas.height / 2 + radiusY * Math.sin(angle)

        const size = Math.random() * 4 + 2

        ctx.globalAlpha = Math.random() * 0.5 + 0.5
        ctx.beginPath()
        ctx.arc(x, y, size, 0, 2 * Math.PI)
        ctx.fill()
      }

      ctx.globalAlpha = 1.0
    })

    // 添加水波纹效果
    const time = Date.now() / 1000
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)"
    ctx.lineWidth = 1

    for (let i = 0; i < 3; i++) {
      const radius = (canvas.width / 2 - 20) * (0.7 + 0.1 * i) + 10 * Math.sin(time + i)

      ctx.beginPath()
      ctx.ellipse(canvas.width / 2, canvas.height / 2, radius, radius * 0.8, 0, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // 绘制水轮廓
    ctx.strokeStyle = "rgba(96, 165, 250, 0.6)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.ellipse(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, canvas.height / 2 - 10, 0, 0, 2 * Math.PI)
    ctx.stroke()

    // 添加光泽效果
    const highlight = ctx.createRadialGradient(
      canvas.width / 2 - 30,
      canvas.height / 2 - 30,
      0,
      canvas.width / 2 - 30,
      canvas.height / 2 - 30,
      40,
    )
    highlight.addColorStop(0, "rgba(255, 255, 255, 0.4)")
    highlight.addColorStop(1, "rgba(255, 255, 255, 0)")

    ctx.fillStyle = highlight
    ctx.beginPath()
    ctx.ellipse(canvas.width / 2 - 30, canvas.height / 2 - 30, 20, 15, Math.PI / 4, 0, 2 * Math.PI)
    ctx.fill()
  }, [elements, levels])

  // 添加动画效果
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      // 触发重绘
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // 这里不需要做任何事情，只是触发重绘
      }
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [elements, levels])

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={240} height={240} className="rounded-full shadow-inner" />
      <Droplet className="absolute top-2 right-2 h-6 w-6 text-blue-400 opacity-70" />
    </div>
  )
}
