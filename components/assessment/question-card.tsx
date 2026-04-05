"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Question } from "@/lib/types"
import { cn } from "@/lib/utils"

interface QuestionCardProps {
  question: Question
  isActive: boolean
  isAnswered: boolean
  onClick: () => void
}

export function QuestionCard({ question, isActive, isAnswered, onClick }: QuestionCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]",
        isActive && "ring-2 ring-primary shadow-lg",
        isAnswered && "bg-emerald-50 border-emerald-200"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl">{question.icon}</span>
          <Badge variant={question.subject === 'portugues' ? 'default' : 'secondary'}>
            {question.subject === 'portugues' ? 'Português' : 'Matemática'}
          </Badge>
        </div>
        <CardTitle className="text-lg">{question.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{question.subtitle}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Questão {question.id}</span>
          {isAnswered && (
            <span className="text-xs text-emerald-600 font-medium">Respondida</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
