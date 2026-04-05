"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAssessment } from "@/lib/assessment-context"
import { cn } from "@/lib/utils"
import { useState } from "react"

const OBJETOS = [
  { id: 'dado', emoji: '🎲', name: 'Dado' },
  { id: 'bola', emoji: '⚽', name: 'Bola' },
  { id: 'lata', emoji: '🥫', name: 'Lata' },
  { id: 'caixa', emoji: '📦', name: 'Caixa' },
  { id: 'cone', emoji: '🔺', name: 'Cone de trânsito' },
  { id: 'piramide', emoji: '🔺', name: 'Pirâmide' }
]

const SOLIDOS = [
  { id: 'cubo', name: 'Cubo', icon: '⬜' },
  { id: 'esfera', name: 'Esfera', icon: '🔵' },
  { id: 'cilindro', name: 'Cilindro', icon: '🔲' },
  { id: 'paralelepipedo', name: 'Paralelepípedo', icon: '📦' },
  { id: 'coneGeo', name: 'Cone', icon: '🔻' },
  { id: 'piramideGeo', name: 'Pirâmide', icon: '🔺' }
]

export function Question8() {
  const { state, setAnswer, setObservation } = useAssessment()
  const answers = (state.answers[8] as Record<string, string>) || {}
  const [selectedObject, setSelectedObject] = useState<string | null>(null)

  const handleMatch = (solidoId: string) => {
    if (selectedObject) {
      setAnswer(8, { ...answers, [selectedObject]: solidoId })
      setSelectedObject(null)
    }
  }

  const getMatchedSolido = (objetoId: string) => {
    return answers[objetoId] ? SOLIDOS.find(s => s.id === answers[objetoId])?.name : null
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔷</span>
          Questão 8 - Sólidos Geométricos
        </CardTitle>
        <CardDescription>
          Relacione as figuras aos sólidos geométricos. Clique em um objeto e depois no sólido correspondente.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Objetos */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Objetos do dia a dia:</Label>
            <div className="grid grid-cols-2 gap-2">
              {OBJETOS.map((objeto) => (
                <button
                  key={objeto.id}
                  onClick={() => setSelectedObject(objeto.id)}
                  className={cn(
                    "p-3 rounded-lg border-2 transition-all text-center",
                    selectedObject === objeto.id 
                      ? "border-primary bg-primary/10" 
                      : "border-muted hover:border-primary/50",
                    answers[objeto.id] && "bg-emerald-50 border-emerald-300"
                  )}
                >
                  <span className="text-3xl">{objeto.emoji}</span>
                  <p className="text-sm mt-1">{objeto.name}</p>
                  {getMatchedSolido(objeto.id) && (
                    <p className="text-xs text-emerald-600 font-medium mt-1">
                      → {getMatchedSolido(objeto.id)}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sólidos */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Sólidos geométricos:</Label>
            <div className="grid grid-cols-2 gap-2">
              {SOLIDOS.map((solido) => (
                <button
                  key={solido.id}
                  onClick={() => handleMatch(solido.id)}
                  disabled={!selectedObject}
                  className={cn(
                    "p-3 rounded-lg border-2 transition-all text-center",
                    !selectedObject && "opacity-50 cursor-not-allowed",
                    selectedObject && "hover:border-primary hover:bg-primary/5"
                  )}
                >
                  <span className="text-3xl">{solido.icon}</span>
                  <p className="text-sm mt-1">{solido.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {selectedObject && (
          <div className="bg-blue-50 p-3 rounded-lg text-center text-blue-700">
            Agora clique no sólido geométrico correspondente ao {OBJETOS.find(o => o.id === selectedObject)?.name}
          </div>
        )}

        <div className="pt-4 border-t space-y-2">
          <Label htmlFor="obs8" className="text-muted-foreground">Observações do Professor(a):</Label>
          <Textarea
            id="obs8"
            placeholder="Adicione observações sobre o desempenho do aluno..."
            value={state.observations[8] || ''}
            onChange={(e) => setObservation(8, e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}
