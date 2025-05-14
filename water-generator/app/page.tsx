import type { Metadata } from "next"
import Dashboard from "@/components/dashboard"

export const metadata: Metadata = {
  title: "智能水分定制系统",
  description: "基于智能手环数据的个性化水分配方推荐",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-blue-900">智能水分定制系统</h1>
        <p className="text-center text-blue-600 mb-8 max-w-2xl mx-auto">
          基于智能手环监测的生理数据，为您提供个性化的水分配方
        </p>
        <Dashboard />
      </div>
    </div>
  )
}
