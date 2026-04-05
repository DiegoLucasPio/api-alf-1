"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAssessment } from "@/lib/assessment-context"

const POEMA = `A BAILARINA

ESTA MENINA
TÃO PEQUENINA
QUER SER BAILARINA.
NÃO CONHECE NEM DÓ NEM RÉ
MAS SABE FICAR NA PONTA DO PÉ.

NÃO CONHECE NEM MI NEM FÁ
MAS INCLINA O CORPO PARA CÁ E PARA LÁ

NÃO CONHECE NEM LÁ NEM SI,
MAS FECHA OS OLHOS E SORRI.

RODA, RODA, RODA, COM OS BRACINHOS NO AR
E NÃO FICA TONTA NEM SAI DO LUGAR.

PÕE NO CABELO UMA ESTRELA E UM VÉU
E DIZ QUE CAIU DO CÉU.

ESTA MENINA
TÃO PEQUENINA
QUER SER BAILARINA.

MAS DEPOIS ESQUECE TODAS AS DANÇAS,
E TAMBÉM QUER DORMIR COMO AS OUTRAS CRIANÇAS.

CECÍLIA MEIRELES`

export function Question3() {
  const { state, setAnswer, setObservation } = useAssessment()
  const answers = (state.answers[3] as Record<string, string>) || {}

  const handleChange = (field: string, value: string) => {
    setAnswer(3, { ...answers, [field]: value })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">💃</span>
          Questão 3 - A Bailarina
        </CardTitle>
        <CardDescription>
          Leia o poema e responda as perguntas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/50 p-4 rounded-lg">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
            {POEMA}
          </pre>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">A) Qual o título do poema?</Label>
            <Input
              id="titulo"
              placeholder="Digite o título..."
              value={answers.titulo || ''}
              onChange={(e) => handleChange('titulo', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="autor">B) Qual o nome do autor?</Label>
            <Input
              id="autor"
              placeholder="Digite o nome do autor..."
              value={answers.autor || ''}
              onChange={(e) => handleChange('autor', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cabelo">C) O que a bailarina tem no cabelo?</Label>
            <Input
              id="cabelo"
              placeholder="Digite sua resposta..."
              value={answers.cabelo || ''}
              onChange={(e) => handleChange('cabelo', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>D) Identifique palavras que rimam no texto:</Label>
            <Textarea
              placeholder="Digite as palavras que rimam..."
              value={answers.rimas || ''}
              onChange={(e) => handleChange('rimas', e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <Label htmlFor="obs3" className="text-muted-foreground">Observações do Professor(a):</Label>
          <Textarea
            id="obs3"
            placeholder="Adicione observações sobre o desempenho do aluno..."
            value={state.observations[3] || ''}
            onChange={(e) => setObservation(3, e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}
