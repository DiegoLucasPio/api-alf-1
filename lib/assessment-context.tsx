"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { AssessmentState } from './types'

interface AssessmentContextType {
  state: AssessmentState
  setAnswer: (questionId: number, value: string | string[] | Record<string, string>) => void
  setObservation: (questionId: number, value: string) => void
  setCurrentQuestion: (questionId: number) => void
  setStudentInfo: (info: Partial<Pick<AssessmentState, 'studentName' | 'schoolName' | 'teacherName' | 'date'>>) => void
  resetAssessment: () => void
  getProgress: () => { answered: number; total: number; percentage: number }
}

const initialState: AssessmentState = {
  studentName: '',
  schoolName: '',
  teacherName: '',
  date: '',
  answers: {},
  observations: {},
  currentQuestion: 0
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined)

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentState>(initialState)

  const setAnswer = (questionId: number, value: string | string[] | Record<string, string>) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value }
    }))
  }

  const setObservation = (questionId: number, value: string) => {
    setState(prev => ({
      ...prev,
      observations: { ...prev.observations, [questionId]: value }
    }))
  }

  const setCurrentQuestion = (questionId: number) => {
    setState(prev => ({ ...prev, currentQuestion: questionId }))
  }

  const setStudentInfo = (info: Partial<Pick<AssessmentState, 'studentName' | 'schoolName' | 'teacherName' | 'date'>>) => {
    setState(prev => ({ ...prev, ...info }))
  }

  const resetAssessment = () => {
    setState(initialState)
  }

  const getProgress = () => {
    const total = 17
    const answered = Object.keys(state.answers).filter(key => {
      const value = state.answers[Number(key)]
      if (typeof value === 'string') return value.trim() !== ''
      if (Array.isArray(value)) return value.some(v => v.trim() !== '')
      if (typeof value === 'object') return Object.values(value).some(v => v.trim() !== '')
      return false
    }).length
    return { answered, total, percentage: Math.round((answered / total) * 100) }
  }

  return (
    <AssessmentContext.Provider value={{
      state,
      setAnswer,
      setObservation,
      setCurrentQuestion,
      setStudentInfo,
      resetAssessment,
      getProgress
    }}>
      {children}
    </AssessmentContext.Provider>
  )
}

export function useAssessment() {
  const context = useContext(AssessmentContext)
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider')
  }
  return context
}
