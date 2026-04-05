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

  // Focar no input correto quando mudar de tela
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
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Questão 1 - Meu Nome
          </CardTitle>
          <CardDescription>
            Passo 1 de 2: Escreva seu nome completo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-lg font-medium">
              1 - Escreva o seu nome completo:
            </Label>
            <Input
              ref={nameInputRef}
              id="nome"
              placeholder="Digite seu nome completo aqui..."
              value={answers.nome || ''}
              onChange={(e) => handleChange('nome', e.target.value)}
              className="text-xl h-14 font-medium"
              readOnly
            />
          </div>

          <VirtualKeyboard
            type="text"
            onKeyPress={handleKeyPress}
            onBackspace={handleBackspace}
            onClear={handleClear}
          />

          <div className="flex justify-end pt-4 border-t">
            <Button 
              onClick={() => setSubScreen(2)}
              className="gap-2"
              size="lg"
            >
              Continuar
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Sub-tela 2: Data de Nascimento
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Questão 1 - Data de Nascimento
        </CardTitle>
        <CardDescription>
          Passo 2 de 2: Escreva sua data de nascimento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {answers.nome && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Nome informado:</p>
            <p className="font-medium text-lg">{answers.nome}</p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="nascimento" className="text-lg font-medium">
            Escreva dia, mês e ano do seu nascimento:
          </Label>
          <Input
            ref={dateInputRef}
            id="nascimento"
            placeholder="Ex: 15 de março de 2015"
            value={answers.nascimento || ''}
            onChange={(e) => handleChange('nascimento', e.target.value)}
            className="text-xl h-14 font-medium"
            readOnly
          />
        </div>

        <VirtualKeyboard
          type="date"
          onKeyPress={handleKeyPress}
          onBackspace={handleBackspace}
          onClear={handleClear}
        />

        <div className="flex justify-between pt-4 border-t">
          <Button 
            variant="outline"
            onClick={() => setSubScreen(1)}
            className="gap-2"
            size="lg"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-green-500" />
            Questão completa
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
