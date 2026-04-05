"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAssessment } from "@/lib/assessment-context"

const BRINQUEDOS = [
  { nome: 'Bola', emoji: '⚽', votos: 6 },
  { nome: 'Boneca', emoji: '🧸', votos: 4 },
  { nome: 'Carrinho', emoji: '🚗', votos: 5 },
  { nome: 'Pipa', emoji: '🪁', votos: 2 }
]

export function Question13() {
  const { state, setAnswer, setObservation } = useAssessment()
  const answers = (state.answers[13] as Record<string, string>) || {}

  const handleChange = (field: string, value: string) => {
    setAnswer(13, { ...answers, [field]: value })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Questão 13 - Gráfico de Brinquedos
        </CardTitle>
        <CardDescription>
          As crianças fizeram uma pesquisa na sala de aula para saber qual brinquedo os coleguinhas gostavam mais.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tabela de dados */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-muted">
                <th className="border border-gray-300 p-2">Brinquedo</th>
                <th className="border border-gray-300 p-2">Votos</th>
              </tr>
            </thead>
            <tbody>
              {BRINQUEDOS.map((brinquedo) => (
                <tr key={brinquedo.nome}>
                  <td className="border border-gray-300 p-2 text-center">
                    <span className="text-2xl mr-2">{brinquedo.emoji}</span>
                    {brinquedo.nome}
                  </td>
                  <td className="border border-gray-300 p-2 text-center font-bold">
                    {brinquedo.votos}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gráfico de barras visual */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <Label className="text-base font-medium mb-4 block">A) Gráfico de Brinquedos Favoritos:</Label>
          <div className="space-y-3">
            {BRINQUEDOS.map((brinquedo) => (
              <div key={brinquedo.nome} className="flex items-center gap-3">
                <span className="w-20 text-sm">{brinquedo.emoji} {brinquedo.nome}</span>
                <div className="flex-1 bg-gray-200 rounded h-6 overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${(brinquedo.votos / 6) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-center font-bold">{brinquedo.votos}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maisVotado">B) Qual foi o brinquedo mais votado?</Label>
            <Input
              id="maisVotado"
              placeholder="Digite o brinquedo mais votado..."
              value={answers.maisVotado || ''}
              onChange={(e) => handleChange('maisVotado', e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="menosVotado">C) Qual foi o brinquedo menos votado?</Label>
            <Input
              id="menosVotado"
              placeholder="Digite o brinquedo menos votado..."
              value={answers.menosVotado || ''}
              onChange={(e) => handleChange('menosVotado', e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="boneca">D) Quantas crianças preferiram a boneca?</Label>
            <Input
              id="boneca"
              placeholder="Digite o número..."
              value={answers.boneca || ''}
              onChange={(e) => handleChange('boneca', e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="total">E) Quantas crianças participaram da pesquisa?</Label>
            <Input
              id="total"
              placeholder="Digite o total..."
              value={answers.total || ''}
              onChange={(e) => handleChange('total', e.target.value)}
              className="max-w-xs"
            />
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <Label htmlFor="obs13" className="text-muted-foreground">Observações do Professor(a):</Label>
          <Textarea
            id="obs13"
            placeholder="Adicione observações sobre o desempenho do aluno..."
            value={state.observations[13] || ''}
            onChange={(e) => setObservation(13, e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}
