import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Element {
  id: string
  name: string
  color: string
  benefits: string
  maxLevel: number
  unit: string
}

interface ElementInfoProps {
  elements: Element[]
}

export default function ElementInfo({ elements }: ElementInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trace Elements Information</CardTitle>
        <CardDescription>Learn about the trace elements and their benefits</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={elements[0].id}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6">
            {elements.map((element) => (
              <TabsTrigger key={element.id} value={element.id}>
                {element.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {elements.map((element) => (
            <TabsContent key={element.id} value={element.id} className="space-y-4">
              <div className="flex items-center gap-4 mt-4">
                <div className="w-12 h-12 rounded-full" style={{ backgroundColor: element.color }}></div>
                <div>
                  <h3 className="text-xl font-bold">{element.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Recommended range: 0-{element.maxLevel} {element.unit}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Health Benefits</h4>
                  <p>{element.benefits}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Dietary Sources</h4>
                  {element.id === "magnesium" && <p>Found in green leafy vegetables, nuts, seeds, and whole grains.</p>}
                  {element.id === "calcium" && <p>Found in dairy products, leafy greens, and fortified foods.</p>}
                  {element.id === "potassium" && <p>Found in bananas, potatoes, avocados, and leafy greens.</p>}
                  {element.id === "sodium" && (
                    <p>Found in table salt, processed foods, and many natural foods in small amounts.</p>
                  )}
                  {element.id === "zinc" && <p>Found in oysters, red meat, poultry, beans, and nuts.</p>}
                  {element.id === "selenium" && <p>Found in Brazil nuts, seafood, and organ meats.</p>}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Deficiency Symptoms</h4>
                  {element.id === "magnesium" && <p>Muscle cramps, fatigue, irregular heartbeat, and osteoporosis.</p>}
                  {element.id === "calcium" && (
                    <p>Weak bones, osteoporosis, muscle cramps, and heart rhythm abnormalities.</p>
                  )}
                  {element.id === "potassium" && <p>Weakness, fatigue, muscle cramps, and irregular heartbeat.</p>}
                  {element.id === "sodium" && <p>Headache, nausea, muscle cramps, and in severe cases, seizures.</p>}
                  {element.id === "zinc" && (
                    <p>Impaired immune function, slow wound healing, and loss of taste or smell.</p>
                  )}
                  {element.id === "selenium" && <p>Weakened immune system, cognitive decline, and thyroid problems.</p>}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
