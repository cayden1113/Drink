// 推荐引擎 - 基于生理数据生成水分配方推荐
const RecommendationEngine = {
  generateRecommendations: (healthData: any) => {
    // 基于水分水平的推荐
    if (healthData.hydrationLevel < 50) {
      return {
        name: "快速水分补充配方",
        forCondition: "水分不足",
        elementLevels: {
          magnesium: 15,
          calcium: 10,
          potassium: 20,
          sodium: 25,
          zinc: 2,
          selenium: 1,
          electrolytes: 40,
          vitamin_b: 5,
        },
        highlightedElements: ["electrolytes", "potassium", "sodium"],
      }
    }

    // 基于压力水平的推荐
    if (healthData.stressLevel > 60) {
      return {
        name: "舒缓压力配方",
        forCondition: "压力水平高",
        elementLevels: {
          magnesium: 35,
          calcium: 15,
          potassium: 10,
          sodium: 5,
          zinc: 5,
          selenium: 3,
          electrolytes: 20,
          vitamin_b: 15,
        },
        highlightedElements: ["magnesium", "vitamin_b", "selenium"],
      }
    }

    // 基于心率的推荐
    if (healthData.heartRate > 85) {
      return {
        name: "心血管支持配方",
        forCondition: "心率偏高",
        elementLevels: {
          magnesium: 25,
          calcium: 15,
          potassium: 25,
          sodium: 5,
          zinc: 3,
          selenium: 2,
          electrolytes: 15,
          vitamin_b: 5,
        },
        highlightedElements: ["potassium", "magnesium"],
      }
    }

    // 基于体温的推荐
    if (healthData.bodyTemperature > 37.2) {
      return {
        name: "降温平衡配方",
        forCondition: "体温偏高",
        elementLevels: {
          magnesium: 15,
          calcium: 10,
          potassium: 15,
          sodium: 20,
          zinc: 5,
          selenium: 2,
          electrolytes: 30,
          vitamin_b: 3,
        },
        highlightedElements: ["electrolytes", "sodium"],
      }
    }

    // 默认推荐
    return {
      name: "日常平衡配方",
      forCondition: "日常维护",
      elementLevels: {
        magnesium: 20,
        calcium: 20,
        potassium: 15,
        sodium: 10,
        zinc: 3,
        selenium: 2,
        electrolytes: 15,
        vitamin_b: 5,
      },
      highlightedElements: ["magnesium", "calcium"],
    }
  },
}

export default RecommendationEngine
