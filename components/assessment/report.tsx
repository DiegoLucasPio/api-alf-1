"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAssessment } from "@/lib/assessment-context"
import { questions } from "@/lib/questions"
import { ArrowLeft, Printer } from "lucide-react"

interface ReportProps {
  onBack: () => void
}

export function Report({ onBack }: ReportProps) {
  const { state, getProgress, setStudentInfo } = useAssessment()
  const { answered, total, percentage } = getProgress()

  const formatAnswer = (answer: string | string[] | Record<string, string> | undefined) => {
    if (!answer) return "Não respondida"
    if (typeof answer === 'string') return answer || "Não respondida"
    if (Array.isArray(answer)) return answer.filter(v => v).join(', ') || "Não respondida"
    if (typeof answer === 'object') {
      const values = Object.entries(answer)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
      return values.length > 0 ? values.join('; ') : "Não respondida"
    }
    return "Não respondida"
  }

  const handlePrint = () => {
    window.print()
  }

  const portuguesQuestions = questions.filter(q => q.subject === 'portugues')
  const matematicaQuestions = questions.filter(q => q.subject === 'matematica')

  return (
    <div className="max-w-4xl mx-auto space-y-6 print:space-y-4">
      <div className="flex items-center justify-between print:hidden">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button onClick={handlePrint}>
          <Printer className="w-4 h-4 mr-2" />
          Imprimir Relatório
        </Button>
      </div>

      {{/* Informações do Aluno - Editáveis */}
      <Card className="print:hidden">
        <CardHeader>
          <CardTitle>Informações do Aluno</CardTitle>
          <CardDescription>
            Preencha os dados do aluno para o relatório
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="schoolName">Unidade Escolar:</Label>
              <Input
                id="schoolName"
                placeholder="Nome da escola..."
                value={state.schoolName}
                onChange={(e) => setStudentInfo({ schoolName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacherName">Prof.(a) do AEE:</Label>
              <Input
                id="teacherName"
                placeholder="Nome do professor(a)..."
                value={state.teacherName}
                onChange={(e) => setStudentInfo({ teacherName: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Nome do Aluno:</Label>
              <Input
                id="studentName"
                placeholder="Nome completo do aluno..."
                value={state.studentName}
                onChange={(e) => setStudentInfo({ studentName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Data:</Label>
              <Input
                id="date"
                type="date"
                value={state.date}
                onChange={(e) => setStudentInfo({ date: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cabeçalho do Relatório - Visível na impressão */}
      <Card className="print:shadow-none print:border-2">
        <CardHeader className="text-center">
          <div className="text-sm text-muted-foreground mb-2">
            SECRETARIA MUNICIPAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA
          </div>
          <div className="text-sm text-muted-foreground">
            Departamento de Pedagogia e Formação Continuada
          </div>
          <CardTitle className="mt-4">
            RELATÓRIO - AVALIAÇÃO PEDAGÓGICA INICIAL/FINAL A.E.E. (PT1)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Unidade Escolar:</span>{" "}
              {state.schoolName || "Não informada"}
            </div>
            <div>
              <span className="font-medium">Prof.(a) do AEE:</span>{" "}
              {state.teacherName || "Não informado"}
            </div>
            <div>
              <span className="font-medium">Nome do Aluno:</span>{" "}
              {state.studentName || "Não informado"}
            </div>
            <div>
              <span className="font-medium">Data:</span>{" "}
              {state.date ? new Date(state.date).toLocaleDateString('pt-BR') : "Não informada"}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{percentage}%</div>
              <div className="text-sm text-muted-foreground">Progresso</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{answered}/{total}</div>
              <div className="text-sm text-muted-foreground">Questões Respondidas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Língua Portuguesa */}
      <Card className="print:shadow-none print:border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge className="bg-blue-500">Língua Portuguesa</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {portuguesQuestions.map((question) => (
            <div key={question.id} className="p-4 bg-muted/50 rounded-lg print:bg-white print:border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-medium">Questão {question.id}:</span>{" "}
                  <span>{question.title}</span>
                </div>
                {state.answers[question.id] ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    Respondida
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-50 text-gray-500">
                    Pendente
                  </Badge>
                )}
              </div>
              <div className="text-sm mt-2">
                <span className="font-medium">Resposta:</span>{" "}
                <span className="text-muted-foreground">{formatAnswer(state.answers[question.id])}</span>
              </div>
              {state.observations[question.id] && (
                <div className="text-sm mt-2 p-2 bg-yellow-50 rounded border-l-2 border-yellow-400">
                  <span className="font-medium">Observações:</span>{" "}
                  {state.observations[question.id]}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Matemática */}
      <Card className="print:shadow-none print:border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge className="bg-emerald-500 text-white">Matemática</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {matematicaQuestions.map((question) => (
            <div key={question.id} className="p-4 bg-muted/50 rounded-lg print:bg-white print:border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-medium">Questão {question.id}:</span>{" "}
                  <span>{question.title}</span>
                </div>
                {state.answers[question.id] ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    Respondida
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-50 text-gray-500">
                    Pendente
                  </Badge>
                )}
              </div>
              <div className="text-sm mt-2">
                <span className="font-medium">Resposta:</span>{" "}
                <span className="text-muted-foreground">{formatAnswer(state.answers[question.id])}</span>
              </div>
              {state.observations[question.id] && (
                <div className="text-sm mt-2 p-2 bg-yellow-50 rounded border-l-2 border-yellow-400">
                  <span className="font-medium">Observações:</span>{" "}
                  {state.observations[question.id]}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rodapé */}
      <div className="text-center text-sm text-muted-foreground py-4 border-t print:mt-8">
        <p>Centro de Formação dos Profissionais em Educação - Paulo Freire</p>
        <p>Rua Euclides Pires de Assis, nº 205 – Remanso Campineiro – Hortolândia</p>
      </div>
    </div>
  )
}
