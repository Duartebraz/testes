"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Alimentação", value: 3456, color: "#0088FE" },
  { name: "Transporte", value: 1234, color: "#00C49F" },
  { name: "Entretenimento", value: 890, color: "#FFBB28" },
  { name: "Saúde", value: 567, color: "#FF8042" },
  { name: "Educação", value: 345, color: "#8884D8" },
  { name: "Outros", value: 234, color: "#82CA9D" },
]

export function CategoryChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`R$ ${value}`, "Valor"]} />
      </PieChart>
    </ResponsiveContainer>
  )
}
