"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAssessment } from "@/lib/assessment-context"
import { cn } from "@/lib/utils"
import { useState } from "react"

const ABRIL_2024 = [
  [null, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, null, null, null, null]
]

const DIAS_SEMANA = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']

export function Question7() {
  const { state, setAnswer, setObservation } = useAssessment()
  const answers = (state.answers[7] as Record<string, string>) || {}
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({
    segundoDomingo: false,
    ultimoSabado: false
  })

  const handleChange = (field: string, value: string) => {
    setAnswer(7, { ...answers, [field]: value })
  }

  const toggleDay = (day: string) => {
    const newSelected = { ...selectedDays, [day]: !selectedDays[day] }
    setSelectedDays(newSelected)
    setAnswer(7, { 
      ...answers, 
      segundoDomingo: newSelected.segundoDomingo ? '14' : '',
      ultimoSabado: newSelected.ultimoSabado ? '27' : ''
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📅</span>
          Questão 7 - Calendário
        </CardTitle>
        <CardDescription>
          Observe o calendário de Abril e responda
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calendário */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="bg-red-500 text-white text-center py-2 font-bold">
            ABRIL 2024
          </div>
          <div className="p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DIAS_SEMANA.map((dia) => (
                <div key={dia} className="text-center text-xs font-medium text-muted-foreground py-1">
                  {dia}
                </div>
              ))}
            </div>
            {ABRIL_2024.map((semana, i) => (
              <div key={i} className="grid grid-cols-7 gap-1">
                {semana.map((dia, j) => {
                  const isSegundoDomingo = dia === 14
                  const isUltimoSabado = dia === 27
                  const isTiradentes = dia === 21
                  return (
                    <div
                      key={j}
                      className={cn(
                        "text-center py-2 text-sm rounded cursor-pointer transition-all",
                        dia === null && "invisible",
                        isTiradentes && "bg-red-100 text-red-700 font-bold",
                        isSegundoDomingo && selectedDays.segundoDomingo && "bg-blue-500 text-white",
                        isUltimoSabado && selectedDays.ultimoSabado && "bg-red-500 text-white",
                        j === 0 && "text-red-500"
                      )}
                      onClick={() => {
                        if (isSegundoDomingo) toggleDay('segundoDomingo')
                        if (isUltimoSabado) toggleDay('ultimoSabado')
                      }}
                    >
                      {dia}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          <div className="px-4 pb-3 text-xs text-muted-foreground">
            * 21 de Abril - Tiradentes (Feriado Nacional)
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="diasAbril">A) Quantos dias tem o mês de Abril?</Label>
            <Input
              id="diasAbril"
              placeholder="Digite o número de dias..."
              value={answers.diasAbril || ''}
              onChange={(e) => handleChange('diasAbril', e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="diaTiradentes">B) Em qual dia da semana é o feriado de Tiradentes?</Label>
            <Input
              id="diaTiradentes"
              placeholder="Digite o dia da semana..."
              value={answers.diaTiradentes || ''}
              onChange={(e) => handleChange('diaTiradentes', e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="space-y-2">
            <Label>C) Clique no segundo domingo do mês (ficará azul)</Label>
            <p className="text-sm text-muted-foreground">
              {selectedDays.segundoDomingo ? '✓ Dia 14 selecionado' : 'Clique no dia 14 no calendário acima'}
            </p>
          </div>

          <div className="space-y-2">
            <Label>D) Clique no último sábado do mês (ficará vermelho)</Label>
            <p className="text-sm text-muted-foreground">
              {selectedDays.ultimoSabado ? '✓ Dia 27 selecionado' : 'Clique no dia 27 no calendário acima'}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <Label htmlFor="obs7" className="text-muted-foreground">Observações do Professor(a):</Label>
          <Textarea
            id="obs7"
            placeholder="Adicione observações sobre o desempenho do aluno..."
            value={state.observations[7] || ''}
            onChange={(e) => setObservation(7, e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}
