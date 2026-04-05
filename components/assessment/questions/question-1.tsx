"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAssessment } from "@/lib/assessment-context"

export function Question1() {
  const { state, setAnswer, setObservation } = useAssessment()
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

        <div className="pt-4 border-t space-y-2">
          <Label htmlFor="obs1" className="text-muted-foreground">Observações do Professor(a):</Label>
          <Textarea
            id="obs1"
            placeholder="Adicione observações sobre o desempenho do aluno..."
            value={state.observations[1] || ''}
            onChange={(e) => setObservation(1, e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}
