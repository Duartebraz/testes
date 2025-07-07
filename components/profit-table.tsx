import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const profits = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Venda de Produto A",
    category: "Vendas",
    amount: 1500.0,
    source: "Loja Online",
  },
  {
    id: 2,
    date: "2024-01-10",
    description: "Consultoria",
    category: "Serviços",
    amount: 2500.0,
    source: "Cliente Premium",
  },
  {
    id: 3,
    date: "2024-01-08",
    description: "Comissão",
    category: "Vendas",
    amount: 800.0,
    source: "Parceiro",
  },
  {
    id: 4,
    date: "2024-01-05",
    description: "Investimento",
    category: "Rendimentos",
    amount: 350.0,
    source: "Banco",
  },
]

export function ProfitTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {profits.map((profit) => (
          <TableRow key={profit.id}>
            <TableCell className="font-medium">{new Date(profit.date).toLocaleDateString("pt-BR")}</TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{profit.description}</div>
                <div className="text-sm text-muted-foreground">{profit.source}</div>
              </div>
            </TableCell>
            <TableCell className="text-green-600 font-medium">+R$ {profit.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
