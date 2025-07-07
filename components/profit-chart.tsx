"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Jan", lucro: 2400 },
  { name: "Fev", lucro: 1398 },
  { name: "Mar", lucro: 9800 },
  { name: "Abr", lucro: 3908 },
  { name: "Mai", lucro: 4800 },
  { name: "Jun", lucro: 3800 },
  { name: "Jul", lucro: 4300 },
  { name: "Ago", lucro: 5200 },
  { name: "Set", lucro: 4100 },
  { name: "Out", lucro: 6200 },
  { name: "Nov", lucro: 5800 },
  { name: "Dez", lucro: 7200 },
]

export function ProfitChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`R$ ${value}`, "Lucro"]} />
        <Line type="monotone" dataKey="lucro" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e" }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
