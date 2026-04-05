"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Question, IconName } from "@/lib/types"
import { cn } from "@/lib/utils"
import { 
  Pencil, Shirt, Music, Droplets, Image, FileText,
  Calendar, Box, Plus, Hash, Calculator, Clock,
  BarChart, Wallet, Hand, Dice5, Pizza
} from "lucide-react"

const iconMap: Record<IconName, React.ElementType> = {
  'pencil': Pencil,
  'shirt': Shirt,
  'music': Music,
  'droplets': Droplets,
  'image': Image,
  'file-text': FileText,
  'calendar': Calendar,
  'box': Box,
  'plus': Plus,
  'hash': Hash,
  'calculator': Calculator,
  'clock': Clock,
  'bar-chart': BarChart,
  'wallet': Wallet,
  'hand': Hand,
  'dice': Dice5,
  'pizza': Pizza,
}

interface QuestionCardProps {
  question: Question
  isActive: boolean
  isAnswered: boolean
  onClick: () => void
}

export function QuestionCard({ question, isActive, isAnswered, onClick }: QuestionCardProps) {
  const IconComponent = question.icon ? iconMap[question.icon] : Pencil

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
          <IconComponent className="h-6 w-6 text-primary" />
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
