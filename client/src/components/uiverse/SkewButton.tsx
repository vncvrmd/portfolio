// Adapted from Uiverse.io by btongheng - https://uiverse.io/btongheng/blue-bobcat-63
// MIT License (Uiverse.io). Changes: CSS module, site tokens, renders as a scroll link.
import type { ReactNode } from 'react'
import ScrollLink from '../ScrollLink'
import styles from './SkewButton.module.css'

export default function SkewButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <ScrollLink to={to} className={styles.button}>
      <span className="inline-flex items-center gap-2">{children}</span>
    </ScrollLink>
  )
}
