"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAssessment } from "@/lib/assessment-context"

export function Question11() {
  const { state, setAnswer, setObservation } = useAssessment()
  const answers = (state.answers[11] as Record<string, string>) || {}

  const handleChange = (field: string, value: string) => {
    setAnswer(11, { ...answers, [field]: value })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🧮</span>
          Questão 11 - Situações Problema
        </CardTitle>
        <CardDescription>
          Resolva cada situação problema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Problema A */}
        <div className="p-4 bg-blue-50 rounded-lg space-y-3">
          <div className="flex items-start gap-3">
            <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">A</span>
            <div className="flex-1">
              <p className="text-base">
                Elaine tem <strong>quatro figurinhas de natação</strong> e Cecília <strong>duas figurinhas de judô</strong>. 
                Quantas figurinhas de esportes elas têm juntas?
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-2xl">🏊 🏊 🏊 🏊</span>
                <span className="text-xl">+</span>
                <span className="text-2xl">🥋 🥋</span>
                <span className="text-xl">=</span>
                <Input
                  type="text"
                  placeholder="?"
                  value={answers.problemaA || ''}
                  onChange={(e) => handleChange('problemaA', e.target.value)}
                  className="w-20 text-center text-lg font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Problema B */}
        <div className="p-4 bg-green-50 rounded-lg space-y-3">
          <div className="flex items-start gap-3">
            <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">B</span>
            <div className="flex-1">
              <p className="text-base">
                Na classe de Vitor, há <strong>22 estudantes</strong>. Hoje faltaram <strong>5</strong>. 
                Quantos estudantes estão hoje na sala?
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="font-mono text-lg">22 - 5 =</span>
                <Input
                  type="text"
                  placeholder="?"
                  value={answers.problemaB || ''}
                  onChange={(e) => handleChange('problemaB', e.target.value)}
                  className="w-20 text-center text-lg font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Problema C */}
        <div className="p-4 bg-orange-50 rounded-lg space-y-3">
          <div className="flex items-start gap-3">
            <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">C</span>
            <div className="flex-1">
              <p className="text-base">
                Sabendo que cada coelho tem <strong>4 patas</strong>, quantas patas de coelho há na imagem?
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-3xl">🐰 🐰 🐰</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-mono text-lg">3 coelhos × 4 patas =</span>
                <Input
                  type="text"
                  placeholder="?"
                  value={answers.problemaC || ''}
                  onChange={(e) => handleChange('problemaC', e.target.value)}
                  className="w-20 text-center text-lg font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Problema D */}
        <div className="p-4 bg-purple-50 rounded-lg space-y-3">
          <div className="flex items-start gap-3">
            <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">D</span>
            <div className="flex-1">
              <p className="text-base">
                Julia tem <strong>12 bolinhas</strong>, e está colocando em <strong>duas caixas</strong>. 
                Sabendo que todas as bolinhas serão guardadas e as duas caixas ficarão com a mesma quantidade, 
                quantas bolinhas ficarão em cada caixa?
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-2xl">🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-mono text-lg">12 ÷ 2 =</span>
                <Input
                  type="text"
                  placeholder="?"
                  value={answers.problemaD || ''}
                  onChange={(e) => handleChange('problemaD', e.target.value)}
                  className="w-20 text-center text-lg font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <Label htmlFor="obs11" className="text-muted-foreground">Observações do Professor(a):</Label>
          <Textarea
            id="obs11"
            placeholder="Adicione observações sobre o desempenho do aluno..."
            value={state.observations[11] || ''}
            onChange={(e) => setObservation(11, e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}
