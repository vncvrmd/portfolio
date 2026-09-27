import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

// Palette: accent (purple), surface (near-black), deep indigo — kept monochrome for a quiet hero. Tweak visually at
// shadergradient.co/customize — see .claude/skills/shader-gradient for the matching URL.
const portfolioGradient = {
  type: 'waterPlane',
  animate: 'on',
  uSpeed: 0.15,
  uStrength: 1.4,
  uDensity: 1.2,
  uFrequency: 5.5,
  uAmplitude: 0,
  color1: '#7c6bf5',
  color2: '#09090b',
  color3: '#2a2166',
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationX: 50,
  rotationY: 0,
  rotationZ: -60,
  cAzimuthAngle: 180,
  cPolarAngle: 80,
  cDistance: 3.2,
  cameraZoom: 1,
  lightType: '3d',
  brightness: 0.6,
  reflection: 0.1,
  grain: 'off',
  shader: 'defaults'
} as const

export default function GradientBackground() {
  return (
    <ShaderGradientCanvas
      pointerEvents="none"
      pixelDensity={1}
      fov={45}
      powerPreference="low-power"
      lazyLoad={false}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ShaderGradient {...portfolioGradient} />
    </ShaderGradientCanvas>
  )
}
