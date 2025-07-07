import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"
import { TransactionTable } from "@/components/transaction-table"

export default function TransacoesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transações</h2>
          <p className="text-muted-foreground">Histórico completo de todas as transações</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Transação
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Transações</CardDescription>
            <CardTitle className="text-4xl">2.350</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+180 desde ontem</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Entradas</CardDescription>
            <CardTitle className="text-4xl text-green-600">1.420</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">R$ 45.231,89 total</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Saídas</CardDescription>
            <CardTitle className="text-4xl text-red-600">930</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">R$ 12.234,56 total</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Saldo</CardDescription>
            <CardTitle className="text-4xl">R$ 32.997</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Diferença entre entradas e saídas</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Todas as Transações</CardTitle>
              <CardDescription>Lista completa de transações com filtros</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar transações..." className="pl-8 w-[300px]" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TransactionTable />
        </CardContent>
      </Card>
    </div>
  )
}
