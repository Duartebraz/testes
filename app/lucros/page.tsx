import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp } from "lucide-react"
import { ProfitChart } from "@/components/profit-chart"
import { ProfitTable } from "@/components/profit-table"

export default function LucrosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lucros</h2>
          <p className="text-muted-foreground">Acompanhe suas receitas e lucros</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Receita
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Receita Este Mês</CardDescription>
            <CardTitle className="text-4xl">R$ 45.231</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+20.1% em relação ao mês passado</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Lucro Líquido</CardDescription>
            <CardTitle className="text-4xl">R$ 32.997</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Margem de 72.9%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Crescimento</CardDescription>
            <CardTitle className="text-4xl flex items-center">
              <TrendingUp className="mr-2 h-6 w-6 text-green-600" />
              15.8%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Comparado ao mês anterior</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolução dos Lucros</CardTitle>
            <CardDescription>Gráfico mensal dos últimos 12 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfitChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receitas Recentes</CardTitle>
            <CardDescription>Últimas receitas registradas</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfitTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
