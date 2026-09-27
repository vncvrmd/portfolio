import Switch from './uiverse/Switch'
import { useMotionPreference } from '../motionPreference'

export default function MotionToggle({ className = '' }: { className?: string }) {
  const { motionAllowed, setMotionAllowed } = useMotionPreference()

  return (
    <span className={`inline-flex px-2 ${className}`}>
      <Switch label="Journey" checked={motionAllowed} onChange={setMotionAllowed} labelClassName="hidden lg:inline" />
    </span>
  )
}
