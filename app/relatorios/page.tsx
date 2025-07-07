import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Calendar, BarChart3 } from "lucide-react"
import { MonthlyReport } from "@/components/monthly-report"
import { CategoryChart } from "@/components/category-chart"

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Relatórios</h2>
          <p className="text-muted-foreground">Análises detalhadas dos seus gastos e receitas</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="mes">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mes">Este Mês</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="ano">Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Economia Este Mês</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ 2.847</div>
            <p className="text-xs text-muted-foreground">23% a mais que o planejado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maior Gasto</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1.234</div>
            <p className="text-xs text-muted-foreground">Supermercado - 15/01/2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dias Sem Gastos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Neste mês</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gastos por Categoria</CardTitle>
            <CardDescription>Distribuição dos gastos por categoria este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Relatório Mensal</CardTitle>
            <CardDescription>Resumo detalhado do mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <MonthlyReport />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Análise de Tendências</CardTitle>
          <CardDescription>Insights baseados nos seus padrões de gastos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">✓ Pontos Positivos</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Gastos com alimentação 15% abaixo da média</li>
                <li>• Economia de R$ 450 em transporte</li>
                <li>• Meta de poupança atingida em 120%</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">⚠ Pontos de Atenção</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Gastos com entretenimento 25% acima da média</li>
                <li>• Aumento de 10% em compras online</li>
                <li>• Falta de categorização em 5% das transações</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
