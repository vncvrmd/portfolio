import type { MouseEvent, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface ScrollLinkProps {
  to: string
  children: ReactNode
  className?: string
  onNavigate?: () => void
}

export default function ScrollLink({ to, children, className, onNavigate }: ScrollLinkProps) {
  const navigate = useNavigate()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onNavigate?.()
    navigate(to)
  }

  return (
    <a href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
