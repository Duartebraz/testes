import { Progress } from "@/components/ui/progress"

const categories = [
  { name: "Alimentação", budget: 4000, spent: 3456, color: "bg-blue-500" },
  { name: "Transporte", budget: 1500, spent: 1234, color: "bg-green-500" },
  { name: "Entretenimento", budget: 800, spent: 890, color: "bg-yellow-500" },
  { name: "Saúde", budget: 600, spent: 567, color: "bg-red-500" },
  { name: "Educação", budget: 400, spent: 345, color: "bg-purple-500" },
]

export function MonthlyReport() {
  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const percentage = (category.spent / category.budget) * 100
        const isOverBudget = percentage > 100

        return (
          <div key={category.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{category.name}</span>
              <span className={isOverBudget ? "text-red-600" : "text-muted-foreground"}>
                R$ {category.spent} / R$ {category.budget}
              </span>
            </div>
            <Progress value={Math.min(percentage, 100)} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{percentage.toFixed(1)}% do orçamento</span>
              {isOverBudget && (
                <span className="text-red-600">+R$ {(category.spent - category.budget).toFixed(2)} acima</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
