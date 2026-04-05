"use client"

import { useState } from "react"
import { AssessmentProvider, useAssessment } from "@/lib/assessment-context"
import { questions } from "@/lib/questions"
import { Header } from "./header"
import { StudentInfo } from "./student-info"
import { QuestionCard } from "./question-card"
import { QuestionRenderer } from "./question-renderer"
import { Navigation } from "./navigation"
import { Report } from "./report"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

function AssessmentContent() {
  const { state, setCurrentQuestion, resetAssessment } = useAssessment()
  const [showReport, setShowReport] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)

  const isAnswered = (questionId: number) => {
    const answer = state.answers[questionId]
    if (!answer) return false
    if (typeof answer === 'string') return answer.trim() !== ''
    if (Array.isArray(answer)) return answer.some(v => v.trim() !== '')
    if (typeof answer === 'object') return Object.values(answer).some(v => v.trim() !== '')
    return false
  }

  const handleReset = () => {
    resetAssessment()
    setShowResetDialog(false)
    setShowReport(false)
  }

  if (showReport) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header onReset={() => setShowResetDialog(true)} onShowReport={() => setShowReport(false)} />
        <main className="container mx-auto px-4 py-6">
          <Report onBack={() => setShowReport(false)} />
        </main>
        <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Resetar Avaliação?</AlertDialogTitle>
              <AlertDialogDescription>
                Todas as respostas e observações serão apagadas. Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset}>Resetar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
  }

  const portuguesQuestions = questions.filter(q => q.subject === 'portugues')
  const matematicaQuestions = questions.filter(q => q.subject === 'matematica')

  return (
    <div className="min-h-screen bg-muted/30">
      <Header onReset={() => setShowResetDialog(true)} onShowReport={() => setShowReport(true)} />
      
      <main className="container mx-auto px-4 py-6">
        <StudentInfo />

        {state.currentQuestion === 0 ? (
          <div className="space-y-8">
            {/* Português */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-blue-500">Língua Portuguesa</Badge>
                <span className="text-sm text-muted-foreground">
                  {portuguesQuestions.filter(q => isAnswered(q.id)).length} de {portuguesQuestions.length} respondidas
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {portuguesQuestions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    isActive={false}
                    isAnswered={isAnswered(question.id)}
                    onClick={() => setCurrentQuestion(question.id)}
                  />
                ))}
              </div>
            </section>

            {/* Matemática */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-emerald-500 text-white">Matemática</Badge>
                <span className="text-sm text-muted-foreground">
                  {matematicaQuestions.filter(q => isAnswered(q.id)).length} de {matematicaQuestions.length} respondidas
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matematicaQuestions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    isActive={false}
                    isAnswered={isAnswered(question.id)}
                    onClick={() => setCurrentQuestion(question.id)}
                  />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div>
            <QuestionRenderer questionId={state.currentQuestion} />
            <div className="max-w-2xl mx-auto">
              <Navigation 
                currentQuestion={state.currentQuestion} 
                onNavigate={(id) => {
                  if (id < 1) {
                    setCurrentQuestion(0)
                  } else if (id > questions.length) {
                    setCurrentQuestion(0)
                  } else {
                    setCurrentQuestion(id)
                  }
                }}
              />
              <div className="text-center">
                <button 
                  onClick={() => setCurrentQuestion(0)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Voltar para todas as questões
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t bg-background py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Secretaria Municipal de Educação, Ciência e Tecnologia</p>
          <p>Departamento de Pedagogia e Formação Continuada</p>
          <p className="mt-1">Centro de Formação dos Profissionais em Educação - Paulo Freire</p>
        </div>
      </footer>

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resetar Avaliação?</AlertDialogTitle>
            <AlertDialogDescription>
              Todas as respostas e observações serão apagadas. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>Resetar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export function AssessmentApp() {
  return (
    <AssessmentProvider>
      <AssessmentContent />
    </AssessmentProvider>
  )
}
