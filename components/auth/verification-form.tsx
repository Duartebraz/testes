'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, ArrowLeft, MessageCircle } from 'lucide-react'

interface VerificationFormProps {
  phone: string
  onBackToRegister: () => void
}

export function VerificationForm({ phone, onBackToRegister }: VerificationFormProps) {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const { login } = useAuth()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!code.trim() || code.length !== 6) {
      setError('Por favor, informe o código de 6 dígitos')
      return
    }

    setIsLoading(true)

    try {
      // Simula verificação do código
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Código de teste: 123456
      if (code === '123456') {
        // Simula login automático após verificação
        const success = await login(phone, code)
        if (!success) {
          setError('Erro ao fazer login. Tente novamente.')
        }
      } else {
        setError('Código inválido. Tente novamente.')
      }
      
    } catch (error) {
      setError('Erro ao verificar código. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setCanResend(false)
    setCountdown(60)
    setError('')
    
    try {
      // Simula reenvio do código
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Em produção, aqui faria a chamada para reenviar o código
    } catch (error) {
      setError('Erro ao reenviar código')
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(value)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToRegister}
              className="p-1"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl font-bold">
              Verificação
            </CardTitle>
          </div>
          <CardDescription>
            Enviamos um código para {formatPhone(phone)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <MessageCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código de Verificação</Label>
              <Input
                id="code"
                type="text"
                placeholder="000000"
                value={code}
                onChange={handleCodeChange}
                disabled={isLoading}
                className="text-center text-2xl tracking-widest"
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground text-center">
                Digite o código de 6 dígitos enviado via WhatsApp
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || code.length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                'Verificar Código'
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            {canResend ? (
              <Button
                variant="link"
                onClick={handleResendCode}
                className="text-sm"
              >
                Reenviar código
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Reenviar código em {countdown}s
              </p>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">Código de teste:</p>
            <p className="text-sm text-blue-600">123456</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}