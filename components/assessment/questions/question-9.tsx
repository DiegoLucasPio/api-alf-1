"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAssessment } from "@/lib/assessment-context"

const OPERACOES = [
  { id: 'adicao', operacao: '176 + 268', simbolo: '+', resposta: '444' },
  { id: 'subtracao', operacao: '203 - 185', simbolo: '-', resposta: '18' },
  { id: 'multiplicacao', operacao: '221 × 5', simbolo: '×', resposta: '1105' },
  { id: 'divisao', operacao: '135 ÷ 5', simbolo: '÷', resposta: '27' }
]

export function Question9() {
  const { state, setAnswer, setObservation } = useAssessment()
  const answers = (state.answers[9] as Record<string, string>) || {}

  const handleChange = (field: string, value: string) => {
    setAnswer(9, { ...answers, [field]: value })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">➕</span>
          Questão 9 - Operações Matemáticas
        </CardTitle>
        <CardDescription>
          Resolva as operações abaixo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OPERACOES.map((op, index) => (
            <div key={op.id} className="p-4 bg-muted/50 rounded-lg">
              <Label className="text-base font-medium mb-3 block">
                {String.fromCharCode(65 + index)}) {op.operacao} =
              </Label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white p-3 rounded border text-center font-mono text-lg">
                  {op.operacao}
                </div>
                <span className="text-xl">=</span>
                <Input
                  type="text"
                  placeholder="?"
                  value={answers[op.id] || ''}
                  onChange={(e) => handleChange(op.id, e.target.value)}
                  className="w-24 text-center text-lg font-mono"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Dica:</strong> Use o espaço abaixo de cada operação mentalmente ou 
            peça folha de rascunho para fazer os cálculos.
          </p>
        </div>

        <div className="pt-4 border-t space-y-2">
          <Label htmlFor="obs9" className="text-muted-foreground">Observações do Professor(a):</Label>
          <Textarea
            id="obs9"
            placeholder="Adicione observações sobre o desempenho do aluno..."
            value={state.observations[9] || ''}
            onChange={(e) => setObservation(9, e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}
