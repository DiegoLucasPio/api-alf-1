"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAssessment } from "@/lib/assessment-context"

export function Question1() {
  const { state, setAnswer } = useAssessment()
  const answers = (state.answers[1] as Record<string, string>) || {}

  const handleChange = (field: string, value: string) => {
    setAnswer(1, { ...answers, [field]: value })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">✏️</span>
          Questão 1 - Meu Nome
        </CardTitle>
        <CardDescription>
          Escreva seu nome completo e data de nascimento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="nome">1 - Escreva o seu nome completo:</Label>
          <Input
            id="nome"
            placeholder="Digite seu nome completo aqui..."
            value={answers.nome || ''}
            onChange={(e) => handleChange('nome', e.target.value)}
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nascimento">Escreva dia, mês e ano do seu nascimento:</Label>
          <Input
            id="nascimento"
            placeholder="Ex: 15 de março de 2015"
            value={answers.nascimento || ''}
            onChange={(e) => handleChange('nascimento', e.target.value)}
            className="text-lg"
          />
        </div>

        
      </CardContent>
    </Card>
  )
}
