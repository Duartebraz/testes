import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardProvider } from "@/contexts/dashboard-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Genius Finance - Gestão de Gastos",
  description: "Sistema inteligente para gestão de gastos pessoais e empresariais",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <DashboardProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-semibold">Genius Finance</h1>
                </div>
              </header>
              <main className="flex-1 overflow-auto p-4">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </DashboardProvider>
      </body>
    </html>
  )
}
