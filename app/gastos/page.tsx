import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Filter } from "lucide-react"
import { ExpenseTable } from "@/components/expense-table"

export default function GastosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gastos</h2>
          <p className="text-muted-foreground">Gerencie e monitore todos os seus gastos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Gasto
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Gastos Este Mês</CardDescription>
            <CardTitle className="text-4xl">R$ 12.234</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+4.3% em relação ao mês passado</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Maior Categoria</CardDescription>
            <CardTitle className="text-4xl">Alimentação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">R$ 3.456 (28% do total)</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Média Diária</CardDescription>
            <CardTitle className="text-4xl">R$ 394</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Baseado nos últimos 31 dias</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Gastos</CardTitle>
          <CardDescription>Histórico completo de todos os seus gastos</CardDescription>
        </CardHeader>
        <CardContent>
          <ExpenseTable />
        </CardContent>
      </Card>
    </div>
  )
}
