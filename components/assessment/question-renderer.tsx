"use client"

import {
  Question1,
  Question2,
  Question3,
  Question4,
  Question5,
  Question6,
  Question7,
  Question8,
  Question9,
  Question10,
  Question11,
  Question12,
  Question13,
  Question14,
  Question15,
  Question16,
  Question17
} from './questions'

interface QuestionRendererProps {
  questionId: number
}

export function QuestionRenderer({ questionId }: QuestionRendererProps) {
  switch (questionId) {
    case 1:
      return <Question1 />
    case 2:
      return <Question2 />
    case 3:
      return <Question3 />
    case 4:
      return <Question4 />
    case 5:
      return <Question5 />
    case 6:
      return <Question6 />
    case 7:
      return <Question7 />
    case 8:
      return <Question8 />
    case 9:
      return <Question9 />
    case 10:
      return <Question10 />
    case 11:
      return <Question11 />
    case 12:
      return <Question12 />
    case 13:
      return <Question13 />
    case 14:
      return <Question14 />
    case 15:
      return <Question15 />
    case 16:
      return <Question16 />
    case 17:
      return <Question17 />
    default:
      return null
  }
}
