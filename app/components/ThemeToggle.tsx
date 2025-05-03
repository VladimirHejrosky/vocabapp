'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Přepnout téma"
    >
      <Sun className="h-5 w-5 scale-100 dark:scale-0" />
      <Moon className="absolute h-5 w-5 scale-0 dark:scale-100" />
    </Button>
  )
}
