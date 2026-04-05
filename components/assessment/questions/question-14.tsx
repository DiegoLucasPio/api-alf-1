"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAssessment } from "@/lib/assessment-context"

const PESSOAS = [
  { 
    nome: 'Pedro', 
    emoji: '👦',
    dinheiro: [
      { valor: 10, tipo: 'nota' },
      { valor: 10, tipo: 'nota' },
      { valor: 5, tipo: 'nota' },
      { valor: 1, tipo: 'moeda' }
    ],
    total: 26
  },
  { 
    nome: 'Vitória', 
    emoji: '👧',
    dinheiro: [
      { valor: 20, tipo: 'nota' },
      { valor: 5, tipo: 'nota' },
      { valor: 2, tipo: 'moeda' },
      { valor: 1, tipo: 'moeda' }
    ],
    total: 28
  },
  { 
    nome: 'Ana', 
    emoji: '👩',
    dinheiro: [
      { valor: 10, tipo: 'nota' },
      { valor: 10, tipo: 'nota' },
      { valor: 10, tipo: 'nota' },
      { valor: 5, tipo: 'nota' }
    ],
    total: 35
  }
]

export function Question14() {
  const { state, setAnswer, setObservation } = useAssessment()
  const answers = (state.answers[14] as Record<string, string>) || {}

  const handleChange = (field: string, value: string) => {
    setAnswer(14, { ...answers, [field]: value })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          Questão 14 - Dinheiro
        </CardTitle>
        <CardDescription>
          Observe a quantia que Pedro, Vitória e Ana têm
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PESSOAS.map((pessoa) => (
            <div key={pessoa.nome} className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-center mb-3">
                <span className="text-3xl">{pessoa.emoji}</span>
                <p className="font-medium">{pessoa.nome}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-1">
                {pessoa.dinheiro.map((item, i) => (
                  <span 
                    key={i} 
                    className={`px-2 py-1 rounded text-sm font-bold ${
                      item.tipo === 'nota' 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    R$ {item.valor}
                  </span>
                ))}
              </div>
              <p className="text-center mt-2 text-sm text-muted-foreground">
                Total: R$ {pessoa.total}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maisDinheiro">A) Quem tem mais dinheiro?</Label>
            <Input
              id="maisDinheiro"
              placeholder="Digite o nome..."
              value={answers.maisDinheiro || ''}
              onChange={(e) => handleChange('maisDinheiro', e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="anaTotal">B) Quantos reais Ana tem?</Label>
            <div className="flex items-center gap-2">
              <span>R$</span>
              <Input
                id="anaTotal"
                placeholder="Digite o valor..."
                value={answers.anaTotal || ''}
                onChange={(e) => handleChange('anaTotal', e.target.value)}
                className="max-w-[100px]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <Label htmlFor="obs14" className="text-muted-foreground">Observações do Professor(a):</Label>
          <Textarea
            id="obs14"
            placeholder="Adicione observações sobre o desempenho do aluno..."
            value={state.observations[14] || ''}
            onChange={(e) => setObservation(14, e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}
