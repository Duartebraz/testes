import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

const expenses = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Supermercado Extra",
    category: "Alimentação",
    amount: 234.56,
    status: "Confirmado",
  },
  {
    id: 2,
    date: "2024-01-14",
    description: "Posto Shell",
    category: "Transporte",
    amount: 89.9,
    status: "Confirmado",
  },
  {
    id: 3,
    date: "2024-01-13",
    description: "Netflix",
    category: "Entretenimento",
    amount: 29.9,
    status: "Pendente",
  },
  {
    id: 4,
    date: "2024-01-12",
    description: "Farmácia",
    category: "Saúde",
    amount: 45.8,
    status: "Confirmado",
  },
  {
    id: 5,
    date: "2024-01-11",
    description: "Restaurante",
    category: "Alimentação",
    amount: 78.5,
    status: "Confirmado",
  },
]

export function ExpenseTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[100px]">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell className="font-medium">{new Date(expense.date).toLocaleDateString("pt-BR")}</TableCell>
            <TableCell>{expense.description}</TableCell>
            <TableCell>
              <Badge variant="outline">{expense.category}</Badge>
            </TableCell>
            <TableCell className="text-red-600">-R$ {expense.amount.toFixed(2)}</TableCell>
            <TableCell>
              <Badge variant={expense.status === "Confirmado" ? "default" : "secondary"}>{expense.status}</Badge>
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
