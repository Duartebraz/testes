'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, MessageCircle } from 'lucide-react'
import { RegisterForm } from './register-form'
import { VerificationForm } from './verification-form'

type AuthStep = 'login' | 'register' | 'verification'

export function LoginForm() {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [step, setStep] = useState<AuthStep>('login')
  const [pendingPhone, setPendingPhone] = useState('')
  const { login, isLoading } = useAuth()

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!phone.trim() || phone.replace(/\D/g, '').length !== 11) {
      setError('Por favor, informe um WhatsApp válido')
      return
    }

    if (!code.trim() || code.length !== 6) {
      setError('Por favor, informe o código de 6 dígitos')
      return
    }

    const success = await login(phone, code)
    if (!success) {
      setError('WhatsApp ou código incorretos')
    }
  }

  const handleRegisterSuccess = (registeredPhone: string) => {
    setPendingPhone(registeredPhone)
    setStep('verification')
  }

  const handleBackToLogin = () => {
    setStep('login')
    setError('')
  }

  const handleBackToRegister = () => {
    setStep('register')
    setError('')
  }

  if (step === 'register') {
    return (
      <RegisterForm 
        onBackToLogin={handleBackToLogin}
        onRegisterSuccess={handleRegisterSuccess}
      />
    )
  }

  if (step === 'verification') {
    return (
      <VerificationForm 
        phone={pendingPhone}
        onBackToRegister={handleBackToRegister}
      />
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            WhatsApp Login
          </CardTitle>
          <CardDescription className="text-center">
            Entre com seu WhatsApp e código de verificação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">WhatsApp</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={handlePhoneChange}
                disabled={isLoading}
                maxLength={15}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="code">Código de Verificação</Label>
              <Input
                id="code"
                type="text"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                disabled={isLoading}
                className="text-center tracking-widest"
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground">
                Código enviado via WhatsApp
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
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setStep('register')}
              className="text-sm"
            >
              Não tem conta? Cadastre-se
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">Teste:</p>
            <p className="text-sm text-blue-600">WhatsApp: (11) 99999-9999</p>
            <p className="text-sm text-blue-600">Código: 123456</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}