"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAssessment } from "@/lib/assessment-context"
import Image from "next/image"

export function Question2() {
  const { state, setAnswer, setObservation } = useAssessment()
  const answers = (state.answers[2] as Record<string, string>) || {}

  const handleChange = (field: string, value: string) => {
    setAnswer(2, { ...answers, [field]: value })
  }

  const vestimentas = [
    { id: 'vestido', label: 'Vestido', emoji: '👗' },
    { id: 'camisa', label: 'Camisa', emoji: '👔' },
    { id: 'calcas', label: 'Calças', emoji: '👖' }
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">👕</span>
          Questão 2 - Vestuário
        </CardTitle>
        <CardDescription>
          Escreva o nome das peças do vestuário
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vestimentas.map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center text-5xl">
                {item.emoji}
              </div>
              <Input
                placeholder={`Nome da peça...`}
                value={answers[item.id] || ''}
                onChange={(e) => handleChange(item.id, e.target.value)}
                className="text-center"
              />
            </div>
          ))}
        </div>

        <div className="pt-4 border-t space-y-2">
          <Label htmlFor="obs2" className="text-muted-foreground">Observações do Professor(a):</Label>
          <Textarea
            id="obs2"
            placeholder="Adicione observações sobre o desempenho do aluno..."
            value={state.observations[2] || ''}
            onChange={(e) => setObservation(2, e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}
