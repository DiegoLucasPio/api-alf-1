"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAssessment } from "@/lib/assessment-context"

export function StudentInfo() {
  const { state, setStudentInfo } = useAssessment()

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6">
      <CardHeader>
        <CardTitle>Informações do Aluno</CardTitle>
        <CardDescription>
          Preencha os dados antes de iniciar a avaliação
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
  )
}
