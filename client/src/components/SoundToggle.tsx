import { useSound } from '../soundPreference'

export default function SoundToggle({ className = '' }: { className?: string }) {
  const { soundOn, setSoundOn } = useSound()
  return (
    <button
      type="button"
      aria-pressed={soundOn}
      aria-label="Sound effects"
      title={soundOn ? 'Turn sound off' : 'Turn sound on'}
      onClick={() => setSoundOn(!soundOn)}
      className={`inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-surface-3 hover:text-ink ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
        {soundOn ? (
          <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        ) : (
          <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        )}
      </svg>
    </button>
  )
}
