export interface Question {
  id: number
  title: string
  subtitle?: string
  icon?: string
  type: 'text' | 'multi-text' | 'multiple-choice' | 'calendar' | 'matching' | 'math' | 'drawing' | 'textarea' | 'graph' | 'money' | 'fraction' | 'probability'
  subject: 'portugues' | 'matematica'
}

export interface Answer {
  questionId: number
  value: string | string[] | Record<string, string>
}

export interface AssessmentState {
  studentName: string
  schoolName: string
  teacherName: string
  date: string
  answers: Record<number, Answer['value']>
  observations: Record<number, string>
  currentQuestion: number
}
