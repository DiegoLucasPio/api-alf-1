"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Delete } from "lucide-react"

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void
  onBackspace: () => void
  onClear?: () => void
  type?: 'text' | 'date'
  className?: string
}

const textKeys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

const dateKeys = [
  ['1', '2', '3', '4', '5'],
  ['6', '7', '8', '9', '0'],
]

const months = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
]

const monthsFull: Record<string, string> = {
  'Jan': 'Janeiro', 'Fev': 'Fevereiro', 'Mar': 'Março', 'Abr': 'Abril',
  'Mai': 'Maio', 'Jun': 'Junho', 'Jul': 'Julho', 'Ago': 'Agosto',
  'Set': 'Setembro', 'Out': 'Outubro', 'Nov': 'Novembro', 'Dez': 'Dezembro'
}

export function VirtualKeyboard({ 
  onKeyPress, 
  onBackspace, 
  onClear,
  type = 'text',
  className 
}: VirtualKeyboardProps) {
  if (type === 'text') {
    return (
      <div className={cn("flex flex-col h-full", className)}>
        {/* Teclado QWERTY maximizado */}
        <div className="flex-1 flex flex-col gap-1.5">
          {textKeys.map((row, rowIndex) => (
            <div key={rowIndex} className="flex-1 flex justify-center gap-1">
              {row.map((key) => (
                <Button
                  key={key}
                  type="button"
                  variant="outline"
                  className="flex-1 max-w-[10%] h-full text-xl md:text-2xl font-bold transition-all hover:bg-primary hover:text-primary-foreground active:scale-95 shadow-sm"
                  onClick={() => onKeyPress(key)}
                >
                  {key}
                </Button>
              ))}
            </div>
          ))}
          
          {/* Linha de teclas especiais */}
          <div className="flex-1 flex justify-center gap-1">
            <Button
              type="button"
              variant="destructive"
              className="flex-[2] h-full text-lg font-bold transition-all active:scale-95 shadow-sm"
              onClick={onBackspace}
            >
              <Delete className="h-6 w-6 mr-2" />
              Apagar
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-[4] h-full text-lg font-bold transition-all active:scale-95 shadow-sm"
              onClick={() => onKeyPress(' ')}
            >
              ESPAÇO
            </Button>
            {onClear && (
              <Button
                type="button"
                variant="outline"
                className="flex-[2] h-full text-lg font-bold transition-all active:scale-95 shadow-sm border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={onClear}
              >
                Limpar
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Teclado numérico para data
  return (
    <div className={cn("flex flex-col h-full gap-2", className)}>
      {/* Números */}
      <div className="flex-[2] flex flex-col gap-1.5">
        {dateKeys.map((row, rowIndex) => (
          <div key={rowIndex} className="flex-1 flex justify-center gap-1.5">
            {row.map((key) => (
              <Button
                key={key}
                type="button"
                variant="outline"
                className="flex-1 h-full text-3xl md:text-4xl font-bold transition-all hover:bg-primary hover:text-primary-foreground active:scale-95 shadow-sm"
                onClick={() => onKeyPress(key)}
              >
                {key}
              </Button>
            ))}
          </div>
        ))}
      </div>

      {/* Meses em grid compacto */}
      <div className="flex-[1.5] grid grid-cols-6 gap-1">
        {months.map((month) => (
          <Button
            key={month}
            type="button"
            variant="secondary"
            className="h-full text-sm md:text-base font-bold transition-all active:scale-95 shadow-sm"
            onClick={() => onKeyPress(monthsFull[month])}
          >
            {month}
          </Button>
        ))}
      </div>

      {/* Teclas especiais */}
      <div className="flex-1 flex gap-1.5">
        <Button
          type="button"
          variant="outline"
          className="flex-1 h-full text-xl font-bold transition-all active:scale-95 shadow-sm"
          onClick={() => onKeyPress(' de ')}
        >
          de
        </Button>
        <Button
          type="button"
          variant="destructive"
          className="flex-[2] h-full text-lg font-bold transition-all active:scale-95 shadow-sm"
          onClick={onBackspace}
        >
          <Delete className="h-6 w-6 mr-2" />
          Apagar
        </Button>
        {onClear && (
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-full text-lg font-bold transition-all active:scale-95 shadow-sm border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={onClear}
          >
            Limpar
          </Button>
        )}
      </div>
    </div>
  )
}
