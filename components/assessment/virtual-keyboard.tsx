"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Delete, Space, CornerDownLeft } from "lucide-react"

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
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export function VirtualKeyboard({ 
  onKeyPress, 
  onBackspace, 
  onClear,
  type = 'text',
  className 
}: VirtualKeyboardProps) {
  const keys = type === 'text' ? textKeys : dateKeys

  return (
    <div className={cn("space-y-3", className)}>
      {/* Teclado principal */}
      <div className="space-y-2">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map((key) => (
              <Button
                key={key}
                type="button"
                variant="outline"
                className={cn(
                  "font-semibold transition-all hover:scale-105 active:scale-95",
                  type === 'text' 
                    ? "h-12 w-10 md:h-14 md:w-12 text-lg" 
                    : "h-14 w-14 md:h-16 md:w-16 text-2xl"
                )}
                onClick={() => onKeyPress(key)}
              >
                {key}
              </Button>
            ))}
          </div>
        ))}
      </div>

      {/* Teclas especiais para texto */}
      {type === 'text' && (
        <div className="flex justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-12 px-6 md:h-14 md:px-8 font-semibold"
            onClick={onBackspace}
          >
            <Delete className="h-5 w-5 mr-2" />
            Apagar
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 px-8 md:h-14 md:px-12 font-semibold"
            onClick={() => onKeyPress(' ')}
          >
            <Space className="h-5 w-5 mr-2" />
            Espaço
          </Button>
          {onClear && (
            <Button
              type="button"
              variant="outline"
              className="h-12 px-6 md:h-14 md:px-8 font-semibold text-destructive hover:text-destructive"
              onClick={onClear}
            >
              Limpar
            </Button>
          )}
        </div>
      )}

      {/* Seletor de meses e teclas especiais para data */}
      {type === 'date' && (
        <>
          <div className="flex justify-center gap-2 flex-wrap">
            <Button
              type="button"
              variant="outline"
              className="h-12 px-4 md:h-14 md:px-6 font-semibold"
              onClick={() => onKeyPress(' de ')}
            >
              de
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-12 px-6 md:h-14 md:px-8 font-semibold"
              onClick={onBackspace}
            >
              <Delete className="h-5 w-5 mr-2" />
              Apagar
            </Button>
            {onClear && (
              <Button
                type="button"
                variant="outline"
                className="h-12 px-6 md:h-14 md:px-8 font-semibold text-destructive hover:text-destructive"
                onClick={onClear}
              >
                Limpar
              </Button>
            )}
          </div>
          
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground text-center mb-2">Selecione o mês:</p>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {months.map((month) => (
                <Button
                  key={month}
                  type="button"
                  variant="secondary"
                  className="h-10 text-sm font-medium"
                  onClick={() => onKeyPress(month)}
                >
                  {month}
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
