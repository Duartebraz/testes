import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react"

const transactions = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Supermercado Extra",
    category: "Alimentação",
    amount: -234.56,
    type: "expense",
    status: "Confirmado",
    method: "Cartão de Crédito",
  },
  {
    id: 2,
    description: "Salário",
    date: "2024-01-01",
    category: "Receita",
    amount: 5000.0,
    type: "income",
    status: "Confirmado",
    method: "Transferência",
  },
  {
    id: 3,
    date: "2024-01-14",
    description: "Posto Shell",
    category: "Transporte",
    amount: -89.9,
    type: "expense",
    status: "Confirmado",
    method: "Débito",
  },
  {
    id: 4,
    date: "2024-01-13",
    description: "Netflix",
    category: "Entretenimento",
    amount: -29.9,
    type: "expense",
    status: "Pendente",
    method: "Cartão de Crédito",
  },
  {
    id: 5,
    date: "2024-01-12",
    description: "Freelance",
    category: "Receita",
    amount: 800.0,
    type: "income",
    status: "Confirmado",
    method: "PIX",
  },
]

export function TransactionTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Método</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[100px]">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              {transaction.type === "income" ? (
                <ArrowUpRight className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-600" />
              )}
            </TableCell>
            <TableCell className="font-medium">{new Date(transaction.date).toLocaleDateString("pt-BR")}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>
              <Badge variant="outline">{transaction.category}</Badge>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">{transaction.method}</TableCell>
            <TableCell className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
              {transaction.amount > 0 ? "+" : ""}R$ {Math.abs(transaction.amount).toFixed(2)}
            </TableCell>
            <TableCell>
              <Badge variant={transaction.status === "Confirmado" ? "default" : "secondary"}>
                {transaction.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
