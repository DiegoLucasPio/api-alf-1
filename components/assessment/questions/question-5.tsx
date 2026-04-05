"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAssessment } from "@/lib/assessment-context"

export function Question5() {
  const { state, setAnswer, setObservation } = useAssessment()
  const answer = (state.answers[5] as string) || ''

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🖼️</span>
          Questão 5 - Tirinha
        </CardTitle>
        <CardDescription>
          Observe a tirinha e responda
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Representação visual da tirinha */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="grid grid-cols-3 gap-2">
            {/* Quadro 1 */}
            <div className="bg-white p-3 rounded border-2 border-gray-300">
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl">👨</span>
                <span className="text-3xl">🏐</span>
                <p className="text-xs text-center">Homem jogando vôlei</p>
              </div>
            </div>
            {/* Quadro 2 */}
            <div className="bg-white p-3 rounded border-2 border-gray-300">
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl">🏐</span>
                <span className="text-2xl">💨</span>
                <span className="text-3xl">🕸️</span>
                <p className="text-xs text-center">Bola indo para a rede</p>
              </div>
            </div>
            {/* Quadro 3 */}
            <div className="bg-white p-3 rounded border-2 border-gray-300">
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl">👨</span>
                <span className="text-3xl">🕸️</span>
                <p className="text-xs text-center">Homem segurando a rede</p>
              </div>
            </div>
          </div>
          <p className="text-center text-sm mt-3 text-muted-foreground">
            Tirinha: Homem jogando vôlei, bola furou a rede, agora ele segura a rede quebrada
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="resposta5">
            Por que o homem está segurando a rede no último quadro?
          </Label>
          <Textarea
            id="resposta5"
            placeholder="Escreva sua resposta aqui..."
            value={answer}
            onChange={(e) => setAnswer(5, e.target.value)}
            rows={4}
            className="text-base"
          />
        </div>

        <div className="pt-4 border-t space-y-2">
          <Label htmlFor="obs5" className="text-muted-foreground">Observações do Professor(a):</Label>
          <Textarea
            id="obs5"
            placeholder="Adicione observações sobre o desempenho do aluno..."
            value={state.observations[5] || ''}
            onChange={(e) => setObservation(5, e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}
