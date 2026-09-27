// Adapted from Uiverse.io by JaydipPrajapati1910 - https://uiverse.io/JaydipPrajapati1910/curly-monkey-15
// MIT License (Uiverse.io). Changes: CSS module, lime token, status role.
import styles from './StripeLoader.module.css'

export default function StripeLoader({ label = 'Loading' }: { label?: string }) {
  return (
    <div role="status" aria-label={label} className={styles.loader} />
  )
}
