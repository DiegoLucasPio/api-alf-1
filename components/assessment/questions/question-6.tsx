"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAssessment } from "@/lib/assessment-context"

export function Question6() {
  const { state, setAnswer, setObservation } = useAssessment()
  const answer = (state.answers[6] as string) || ''

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📝</span>
          Questão 6 - Reescrita de Fábula
        </CardTitle>
        <CardDescription>
          Escute atentamente enquanto a fábula é lida. Em seguida, reescreva com suas palavras.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📖</span>
            <div>
              <p className="font-medium text-amber-900">Instruções para o Professor(a):</p>
              <p className="text-sm text-amber-800 mt-1">
                Leia uma fábula em voz alta para o aluno. Após a leitura, peça que ele reescreva 
                a história com suas próprias palavras, utilizando as regras de pontuação e 
                atenção na escrita das palavras.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reescrita" className="text-base font-medium">
            Reescreva a fábula com suas palavras:
          </Label>
          <p className="text-sm text-muted-foreground">
            Lembre-se de usar as regras de pontuação e muita atenção na escrita das palavras.
          </p>
          <Textarea
            id="reescrita"
            placeholder="Escreva a fábula aqui..."
            value={answer}
            onChange={(e) => setAnswer(6, e.target.value)}
            rows={12}
            className="text-base leading-relaxed"
          />
        </div>

        <div className="pt-4 border-t space-y-2">
          <Label htmlFor="obs6" className="text-muted-foreground">Observações do Professor(a):</Label>
          <Textarea
            id="obs6"
            placeholder="Adicione observações sobre o desempenho do aluno..."
            value={state.observations[6] || ''}
            onChange={(e) => setObservation(6, e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}
