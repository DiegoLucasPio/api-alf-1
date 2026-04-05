"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAssessment } from "@/lib/assessment-context"

export function Question15() {
  const { state, setAnswer, setObservation } = useAssessment()
  const answers = (state.answers[15] as Record<string, string>) || {}

  const handleChange = (field: string, value: string) => {
    setAnswer(15, { ...answers, [field]: value })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">👐</span>
          Questão 15 - Direita e Esquerda
        </CardTitle>
        <CardDescription>
          Observe a imagem de Mariana e responda
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Representação visual de Mariana */}
        <div className="bg-pink-50 p-6 rounded-lg flex flex-col items-center">
          <div className="relative">
            {/* Figura de Mariana */}
            <div className="flex items-center gap-8">
              <div className="text-center">
                <span className="text-5xl">🌸</span>
                <p className="text-sm mt-1 font-medium">Flor</p>
                <p className="text-xs text-muted-foreground">(Mão Esquerda)</p>
              </div>
              <div className="text-center">
                <span className="text-6xl">👧</span>
                <p className="text-lg font-medium mt-2">Mariana</p>
              </div>
              <div className="text-center">
                <span className="text-5xl">🎈</span>
                <p className="text-sm mt-1 font-medium">Balão</p>
                <p className="text-xs text-muted-foreground">(Mão Direita)</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm">⬅️ Esquerda</span>
            <span className="text-sm">Direita ➡️</span>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
          <strong>Dica:</strong> Pense como se você fosse a Mariana. A mão direita dela é a que está 
          do lado onde ela vê o balão, e a mão esquerda é onde ela vê a flor.
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maoDireita">A) O que Mariana segura na sua mão direita?</Label>
            <Input
              id="maoDireita"
              placeholder="Digite o que está na mão direita..."
              value={answers.maoDireita || ''}
              onChange={(e) => handleChange('maoDireita', e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maoEsquerda">B) O que Mariana segura na sua mão esquerda?</Label>
            <Input
              id="maoEsquerda"
              placeholder="Digite o que está na mão esquerda..."
              value={answers.maoEsquerda || ''}
              onChange={(e) => handleChange('maoEsquerda', e.target.value)}
              className="max-w-xs"
            />
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <Label htmlFor="obs15" className="text-muted-foreground">Observações do Professor(a):</Label>
          <Textarea
            id="obs15"
            placeholder="Adicione observações sobre o desempenho do aluno..."
            value={state.observations[15] || ''}
            onChange={(e) => setObservation(15, e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}
