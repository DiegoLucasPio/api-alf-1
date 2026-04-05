"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAssessment } from "@/lib/assessment-context"
import { cn } from "@/lib/utils"
import { useState } from "react"

const ACONTECIMENTOS = [
  { id: 'acordar', texto: 'Acordar', emoji: '🌅' },
  { id: 'almoco', texto: 'Almoçar', emoji: '🍽️' },
  { id: 'escola', texto: 'Ir para escola', emoji: '🏫' },
  { id: 'dormir', texto: 'Dormir', emoji: '😴' }
]

const HORAS = [
  { id: '7h', texto: '7:00', emoji: '🕖' },
  { id: '12h', texto: '12:00', emoji: '🕛' },
  { id: '13h', texto: '13:00', emoji: '🕐' },
  { id: '21h', texto: '21:00', emoji: '🕘' }
]

export function Question12() {
  const { state, setAnswer } = useAssessment()
  const answers = (state.answers[12] as Record<string, string>) || {}
  const [selectedAcontecimento, setSelectedAcontecimento] = useState<string | null>(null)

  const handleMatch = (horaId: string) => {
    if (selectedAcontecimento) {
      setAnswer(12, { ...answers, [selectedAcontecimento]: horaId })
      setSelectedAcontecimento(null)
    }
  }

  const getMatchedHora = (acontecimentoId: string) => {
    return answers[acontecimentoId] ? HORAS.find(h => h.id === answers[acontecimentoId])?.texto : null
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🕐</span>
          Questão 12 - Horas
        </CardTitle>
        <CardDescription>
          Relacione os acontecimentos com a hora correspondente. Clique em um acontecimento e depois na hora.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Acontecimentos */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Acontecimentos:</Label>
            <div className="space-y-2">
              {ACONTECIMENTOS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedAcontecimento(item.id)}
                  className={cn(
                    "w-full p-3 rounded-lg border-2 transition-all flex items-center gap-3",
                    selectedAcontecimento === item.id 
                      ? "border-primary bg-primary/10" 
                      : "border-muted hover:border-primary/50",
                    answers[item.id] && "bg-emerald-50 border-emerald-300"
                  )}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="flex-1 text-left">{item.texto}</span>
                  {getMatchedHora(item.id) && (
                    <span className="text-sm text-emerald-600 font-medium">
                      → {getMatchedHora(item.id)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Horas */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Horas:</Label>
            <div className="space-y-2">
              {HORAS.map((hora) => (
                <button
                  key={hora.id}
                  onClick={() => handleMatch(hora.id)}
                  disabled={!selectedAcontecimento}
                  className={cn(
                    "w-full p-3 rounded-lg border-2 transition-all flex items-center gap-3",
                    !selectedAcontecimento && "opacity-50 cursor-not-allowed",
                    selectedAcontecimento && "hover:border-primary hover:bg-primary/5"
                  )}
                >
                  <span className="text-2xl">{hora.emoji}</span>
                  <span className="text-lg font-mono">{hora.texto}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {selectedAcontecimento && (
          <div className="bg-blue-50 p-3 rounded-lg text-center text-blue-700">
            Agora clique na hora correspondente para &quot;{ACONTECIMENTOS.find(a => a.id === selectedAcontecimento)?.texto}&quot;
          </div>
        )}

        
      </CardContent>
    </Card>
  )
}
