"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAssessment } from "@/lib/assessment-context"

const OPCOES = [
  { id: 'impossivel', label: 'Impossível', emoji: '❌' },
  { id: 'grande', label: 'Grande', emoji: '🟢' },
  { id: 'pequena', label: 'Pequena', emoji: '🔵' },
  { id: 'media', label: 'Média', emoji: '🟡' }
]

export function Question16() {
  const { state, setAnswer } = useAssessment()
  const answer = (state.answers[16] as string) || ''

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🎲</span>
          Questão 16 - Probabilidade
        </CardTitle>
        <CardDescription>
          Observe a imagem e marque a opção correta
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Representação visual da caixa com bolinhas */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="flex justify-center">
            <div className="bg-amber-100 border-4 border-amber-700 rounded-lg p-4 w-48">
              <p className="text-center text-sm font-medium mb-2">Caixa de Bolinhas</p>
              <div className="flex flex-wrap justify-center gap-2">
                {/* Muitas bolinhas azuis, nenhuma vermelha */}
                <span className="text-2xl">🔵</span>
                <span className="text-2xl">🔵</span>
                <span className="text-2xl">🔵</span>
                <span className="text-2xl">🟢</span>
                <span className="text-2xl">🔵</span>
                <span className="text-2xl">🟡</span>
                <span className="text-2xl">🔵</span>
                <span className="text-2xl">🔵</span>
                <span className="text-2xl">🟢</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-base">
            Se colocarmos todas as bolinhas dentro da caixa, agitarmos bem, fecharmos os olhos 
            e pegarmos uma bolinha, a chance da bolinha que pegarmos ser <strong className="text-red-500">vermelha</strong> é:
          </p>
        </div>

        <RadioGroup
          value={answer}
          onValueChange={(value) => setAnswer(16, value)}
          className="space-y-3"
        >
          {OPCOES.map((opcao) => (
            <div
              key={opcao.id}
              className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
            >
              <RadioGroupItem value={opcao.id} id={opcao.id} />
              <Label htmlFor={opcao.id} className="flex items-center gap-2 cursor-pointer flex-1">
                <span className="text-xl">{opcao.emoji}</span>
                <span className="text-base">{opcao.label}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>

        
      </CardContent>
    </Card>
  )
}
