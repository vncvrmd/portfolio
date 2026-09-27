// Adapted from Uiverse.io by gharsh11032000 - https://uiverse.io/gharsh11032000/sour-vampirebat-66
// MIT License (Uiverse.io). Changes: CSS module, site tokens, role="switch", label, focus ring.
import styles from './Switch.module.css'

interface SwitchProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  labelClassName?: string
}

export default function Switch({ label, checked, onChange, labelClassName = '' }: SwitchProps) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-muted transition-colors duration-200 hover:text-ink">
      <span className={labelClassName}>{label}</span>
      <span className={styles.switch}>
        <input
          type="checkbox"
          role="switch"
          aria-label={label}
          className={styles.input}
          checked={checked}
          onChange={e => onChange(e.target.checked)}
        />
        <span className={styles.slider} aria-hidden="true" />
      </span>
    </label>
  )
}
