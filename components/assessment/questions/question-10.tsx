"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAssessment } from "@/lib/assessment-context"

const DOCES = [
  { id: 'pirulito', emoji: '🍭', equacao: '15 + ? = 20', resposta: '5' },
  { id: 'chocolate', emoji: '🍫', equacao: '? + 8 = 16', resposta: '8' },
  { id: 'bala', emoji: '🍬', equacao: '12 + ? = 25', resposta: '13' },
  { id: 'sorvete', emoji: '🍦', equacao: '? + 7 = 14', resposta: '7' },
  { id: 'cupcake', emoji: '🧁', equacao: '20 + ? = 35', resposta: '15' },
  { id: 'donut', emoji: '🍩', equacao: '? + 9 = 18', resposta: '9' }
]

export function Question10() {
  const { state, setAnswer, setObservation } = useAssessment()
  const answers = (state.answers[10] as Record<string, string>) || {}

  const handleChange = (field: string, value: string) => {
    setAnswer(10, { ...answers, [field]: value })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔢</span>
          Questão 10 - Número Escondido
        </CardTitle>
        <CardDescription>
          Qual é o número escondido? Escreva nos respectivos doces.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {DOCES.map((doce) => (
            <div 
              key={doce.id} 
              className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg border border-pink-100 text-center"
            >
              <span className="text-4xl block mb-2">{doce.emoji}</span>
              <p className="text-sm font-medium mb-2">{doce.equacao}</p>
              <Input
                type="text"
                placeholder="?"
                value={answers[doce.id] || ''}
                onChange={(e) => handleChange(doce.id, e.target.value)}
                className="text-center text-lg font-bold"
              />
            </div>
          ))}
        </div>

        <div className="pt-4 border-t space-y-2">
          <Label htmlFor="obs10" className="text-muted-foreground">Observações do Professor(a):</Label>
          <Textarea
            id="obs10"
            placeholder="Adicione observações sobre o desempenho do aluno..."
            value={state.observations[10] || ''}
            onChange={(e) => setObservation(10, e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}
