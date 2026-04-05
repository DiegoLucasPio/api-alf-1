"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAssessment } from "@/lib/assessment-context"

export function Question4() {
  const { state, setAnswer } = useAssessment()
  const answers = (state.answers[4] as Record<string, string>) || {}

  const handleChange = (field: string, value: string) => {
    setAnswer(4, { ...answers, [field]: value })
  }

  const processos = [
    { id: 'evaporacao', label: 'Sol aquecendo a água', emoji: '☀️', hint: 'Água virando vapor' },
    { id: 'condensacao', label: 'Vapor formando nuvens', emoji: '☁️', hint: 'Vapor virando gotículas' },
    { id: 'precipitacao', label: 'Chuva caindo', emoji: '🌧️', hint: 'Água caindo das nuvens' },
    { id: 'infiltracao', label: 'Água entrando no solo', emoji: '🌱', hint: 'Água absorvida pela terra' }
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">💧</span>
          Questão 4 - Ciclo da Água
        </CardTitle>
        <CardDescription>
          Observe atentamente o ciclo da água e nomeie os processos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Representação visual do ciclo da água */}
        <div className="bg-gradient-to-b from-sky-100 to-blue-50 p-6 rounded-lg">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-8 w-full">
              <div className="text-center">
                <span className="text-4xl">☀️</span>
                <p className="text-xs mt-1">Sol</p>
              </div>
              <div className="text-center">
                <span className="text-4xl">☁️</span>
                <p className="text-xs mt-1">Nuvem</p>
              </div>
              <div className="text-center">
                <span className="text-4xl">🌧️</span>
                <p className="text-xs mt-1">Chuva</p>
              </div>
            </div>
            <div className="w-full h-8 flex items-center justify-center">
              <span className="text-2xl">⬇️ ⬆️ ⬇️</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl">🌊</span>
              <span className="text-4xl">🏔️</span>
              <span className="text-4xl">🌱</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium">Nomeie os processos do ciclo da água:</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {processos.map((processo) => (
              <div key={processo.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <span className="text-2xl">{processo.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{processo.label}</p>
                  <Input
                    placeholder={processo.hint}
                    value={answers[processo.id] || ''}
                    onChange={(e) => handleChange(processo.id, e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </CardContent>
    </Card>
  )
}
