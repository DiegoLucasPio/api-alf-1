"use client"

import { Progress } from "@/components/ui/progress"
import { useAssessment } from "@/lib/assessment-context"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface HeaderProps {
  onReset: () => void
  onShowReport: () => void
}

export function Header({ onReset, onShowReport }: HeaderProps) {
  const { getProgress } = useAssessment()
  const { answered, total, percentage } = getProgress()

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              Avaliação Pedagógica Inicial/Final
            </h1>
            <p className="text-sm text-muted-foreground">
              A.E.E. (PT1) - Língua Portuguesa e Matemática
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1 md:w-48">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">{answered} de {total} questões</span>
                <span className="font-medium">{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onShowReport}>
                Ver Relatório
              </Button>
              <Button variant="ghost" size="sm" onClick={onReset}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Resetar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
