"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplet, Trash2 } from "lucide-react"
import { useState } from "react"

interface SavedRecipesProps {
  recipes: Array<{ name: string; levels: Record<string, number> }>
  onLoad: (recipe: { name: string; levels: Record<string, number> }) => void
}

export default function SavedRecipes({ recipes, onLoad }: SavedRecipesProps) {
  const [savedRecipes, setSavedRecipes] = useState(recipes)

  const handleDelete = (index: number) => {
    const newRecipes = [...savedRecipes]
    newRecipes.splice(index, 1)
    setSavedRecipes(newRecipes)
  }

  if (savedRecipes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saved Recipes</CardTitle>
          <CardDescription>You haven't saved any water recipes yet</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Droplet className="h-16 w-16 text-blue-200 mb-4" />
          <p className="text-center text-muted-foreground">
            Create and save your custom water recipes to see them here
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Recipes</CardTitle>
        <CardDescription>Your custom water recipes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedRecipes.map((recipe, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{recipe.name}</h3>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(index)} className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {Object.entries(recipe.levels)
                    .filter(([_, value]) => value > 0)
                    .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
                    .join(", ")}
                </div>
              </div>
              <div className="p-4 bg-white">
                <Button variant="outline" className="w-full" onClick={() => onLoad(recipe)}>
                  <Droplet className="mr-2 h-4 w-4" />
                  Load Recipe
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
