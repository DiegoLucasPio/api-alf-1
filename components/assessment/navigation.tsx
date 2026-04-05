"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { questions } from "@/lib/questions"

interface NavigationProps {
  currentQuestion: number
  onNavigate: (questionId: number) => void
}

export function Navigation({ currentQuestion, onNavigate }: NavigationProps) {
  const hasPrevious = currentQuestion > 1
  const hasNext = currentQuestion < questions.length

  return (
    <div className="flex items-center justify-between py-4">
      <Button
        variant="outline"
        onClick={() => onNavigate(currentQuestion - 1)}
        disabled={!hasPrevious}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Anterior
      </Button>

      <span className="text-sm text-muted-foreground">
        Questão {currentQuestion} de {questions.length}
      </span>

      <Button
        onClick={() => onNavigate(currentQuestion + 1)}
        disabled={!hasNext}
      >
        Próxima
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  )
}
