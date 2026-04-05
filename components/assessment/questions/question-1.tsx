"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAssessment } from "@/lib/assessment-context"
import { VirtualKeyboard } from "../virtual-keyboard"
import { ArrowRight, ArrowLeft, Check } from "lucide-react"

export function Question1() {
  const { state, setAnswer } = useAssessment()
  const [subScreen, setSubScreen] = useState<1 | 2>(1)
  const answers = (state.answers[1] as Record<string, string>) || {}
  const nameInputRef = useRef<HTMLInputElement>(null)
  const dateInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (field: string, value: string) => {
    setAnswer(1, { ...answers, [field]: value })
  }

  const handleKeyPress = (key: string) => {
    if (subScreen === 1) {
      const currentValue = answers.nome || ''
      handleChange('nome', currentValue + key)
    } else {
      const currentValue = answers.nascimento || ''
      handleChange('nascimento', currentValue + key)
    }
  }

  const handleBackspace = () => {
    if (subScreen === 1) {
      const currentValue = answers.nome || ''
      handleChange('nome', currentValue.slice(0, -1))
    } else {
      const currentValue = answers.nascimento || ''
      handleChange('nascimento', currentValue.slice(0, -1))
    }
  }

  const handleClear = () => {
    if (subScreen === 1) {
      handleChange('nome', '')
    } else {
      handleChange('nascimento', '')
    }
  }

  useEffect(() => {
    if (subScreen === 1 && nameInputRef.current) {
      nameInputRef.current.focus()
    } else if (subScreen === 2 && dateInputRef.current) {
      dateInputRef.current.focus()
    }
  }, [subScreen])

  // Sub-tela 1: Nome
  if (subScreen === 1) {
    return (
      <div className="h-[calc(100vh-12rem)] flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-2 shrink-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              Questao 1 - Meu Nome
            </CardTitle>
            <CardDescription>
              Passo 1 de 2: Escreva seu nome completo
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-3 pb-4">
            <div className="space-y-1 shrink-0">
              <Label htmlFor="nome" className="text-base font-medium">
                1 - Escreva o seu nome completo:
              </Label>
              <Input
                ref={nameInputRef}
                id="nome"
                placeholder="Digite seu nome completo aqui..."
                value={answers.nome || ''}
                onChange={(e) => handleChange('nome', e.target.value)}
                className="text-2xl h-14 font-semibold"
                readOnly
              />
            </div>

            <div className="flex-1 min-h-0">
              <VirtualKeyboard
                type="text"
                onKeyPress={handleKeyPress}
                onBackspace={handleBackspace}
                onClear={handleClear}
                className="h-full"
              />
            </div>

            <div className="flex justify-end shrink-0 pt-2 border-t">
              <Button 
                onClick={() => setSubScreen(2)}
                className="gap-2 h-12 px-6 text-lg"
                size="lg"
              >
                Continuar
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Sub-tela 2: Data de Nascimento
  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-2 shrink-0">
          <CardTitle className="flex items-center gap-2 text-lg">
            Questao 1 - Data de Nascimento
          </CardTitle>
          <CardDescription>
            Passo 2 de 2: Escreva sua data de nascimento
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-3 pb-4">
          {answers.nome && (
            <div className="p-2 bg-muted rounded-lg shrink-0">
              <p className="text-xs text-muted-foreground">Nome informado:</p>
              <p className="font-semibold">{answers.nome}</p>
            </div>
          )}

          <div className="space-y-1 shrink-0">
            <Label htmlFor="nascimento" className="text-base font-medium">
              Escreva dia, mes e ano do seu nascimento:
            </Label>
            <Input
              ref={dateInputRef}
              id="nascimento"
              placeholder="Ex: 15 de marco de 2015"
              value={answers.nascimento || ''}
              onChange={(e) => handleChange('nascimento', e.target.value)}
              className="text-2xl h-14 font-semibold"
              readOnly
            />
          </div>

          <div className="flex-1 min-h-0">
            <VirtualKeyboard
              type="date"
              onKeyPress={handleKeyPress}
              onBackspace={handleBackspace}
              onClear={handleClear}
              className="h-full"
            />
          </div>

          <div className="flex justify-between shrink-0 pt-2 border-t">
            <Button 
              variant="outline"
              onClick={() => setSubScreen(1)}
              className="gap-2 h-12 px-6 text-lg"
              size="lg"
            >
              <ArrowLeft className="h-5 w-5" />
              Voltar
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-5 w-5 text-green-500" />
              Questao completa
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
