"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAssessment } from "@/lib/assessment-context"

const FRACOES = [
  {
    id: 'fracao1',
    imagem: (
      <div className="flex gap-1">
        <div className="w-8 h-8 bg-blue-500 rounded" />
        <div className="w-8 h-8 bg-gray-200 rounded" />
        <div className="w-8 h-8 bg-gray-200 rounded" />
        <div className="w-8 h-8 bg-gray-200 rounded" />
      </div>
    ),
    opcoes: ['1/4', '2/4', '3/4', '1/2'],
    correta: '1/4'
  },
  {
    id: 'fracao2',
    imagem: (
      <div className="flex gap-1">
        <div className="w-8 h-8 bg-green-500 rounded" />
        <div className="w-8 h-8 bg-green-500 rounded" />
        <div className="w-8 h-8 bg-gray-200 rounded" />
      </div>
    ),
    opcoes: ['1/3', '2/3', '1/2', '3/3'],
    correta: '2/3'
  },
  {
    id: 'fracao3',
    imagem: (
      <div className="grid grid-cols-2 gap-1">
        <div className="w-8 h-8 bg-red-500 rounded" />
        <div className="w-8 h-8 bg-gray-200 rounded" />
      </div>
    ),
    opcoes: ['1/4', '1/3', '1/2', '2/2'],
    correta: '1/2'
  },
  {
    id: 'fracao4',
    imagem: (
      <div className="flex gap-1">
        <div className="w-6 h-6 bg-purple-500 rounded" />
        <div className="w-6 h-6 bg-purple-500 rounded" />
        <div className="w-6 h-6 bg-purple-500 rounded" />
        <div className="w-6 h-6 bg-gray-200 rounded" />
        <div className="w-6 h-6 bg-gray-200 rounded" />
      </div>
    ),
    opcoes: ['2/5', '3/5', '4/5', '1/5'],
    correta: '3/5'
  }
]

export function Question17() {
  const { state, setAnswer } = useAssessment()
  const answers = (state.answers[17] as Record<string, string>) || {}

  const handleChange = (fracaoId: string, value: string) => {
    setAnswer(17, { ...answers, [fracaoId]: value })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🍕</span>
          Questão 17 - Frações
        </CardTitle>
        <CardDescription>
          Observe a imagem e marque a opção que apresenta a fração correta para cada imagem
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {FRACOES.map((fracao, index) => (
          <div key={fracao.id} className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </span>
              <div className="p-3 bg-white rounded-lg">
                {fracao.imagem}
              </div>
            </div>
            
            <RadioGroup
              value={answers[fracao.id] || ''}
              onValueChange={(value) => handleChange(fracao.id, value)}
              className="flex flex-wrap gap-3"
            >
              {fracao.opcoes.map((opcao) => (
                <div key={opcao} className="flex items-center">
                  <RadioGroupItem value={opcao} id={`${fracao.id}-${opcao}`} className="peer sr-only" />
                  <Label
                    htmlFor={`${fracao.id}-${opcao}`}
                    className="px-4 py-2 rounded-lg border-2 cursor-pointer 
                      peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground
                      peer-data-[state=checked]:border-primary
                      hover:bg-muted transition-colors font-mono text-lg"
                  >
                    {opcao}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}

        
      </CardContent>
    </Card>
  )
}
