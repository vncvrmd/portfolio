// Original pixel-art character, drawn as SVG rects so it stays crisp at any scale.
// Each frame is a 12×16 grid; letters map to palette colours, '.' is transparent.

const palette: Record<string, string> = {
  H: '#1c1917', // hair
  S: '#e2ad84', // skin
  E: '#0b0b0f', // eye
  T: '#7c6bf5', // shirt (site accent)
  L: '#a3e635', // lanyard / badge
  P: '#26264a', // trousers
  B: '#0f0f14' // shoes
}

const body = [
  '....HHHH....',
  '...HHHHHHH..',
  '...HSSSSH...',
  '...SSSSES...',
  '...SSSSSS...',
  '....SSSS....',
  '...TTLTTT...',
  '..TTTLTTTT..',
  '..TSTLTTST..',
  '..STTTTTTS..',
  '...TTTTTT...',
  '...PPPPPP...'
]

// Arms-up pose for the finale.
const cheerBody = [
  ...body.slice(0, 5),
  '.S..SSSS..S.',
  '.S.TTLTTT.S.',
  '..STTLTTTS..',
  '..TTTLTTTT..',
  '..TTTTTTTT..',
  '...TTTTTT...',
  '...PPPPPP...'
]

const legs = {
  stand: ['...PP..PP...', '...PP..PP...', '...PP..PP...', '...BB..BBB..'],
  strideA: ['..PP....PP..', '.PP......PP.', '.PP......PP.', 'BBB......BBB'],
  strideB: ['...PP.PP....', '...PP.PP....', '....PPP.....', '...BBBBB....']
}

export type SpriteFrame = 'stand' | 'strideA' | 'strideB' | 'cheer'

const PIXEL = 6

export default function PixelSprite({ frame, facing }: { frame: SpriteFrame; facing: 1 | -1 }) {
  const rows = frame === 'cheer' ? [...cheerBody, ...legs.stand] : [...body, ...legs[frame]]
  return (
    <svg
      width={12 * PIXEL}
      height={rows.length * PIXEL}
      viewBox={`0 0 12 ${rows.length}`}
      shapeRendering="crispEdges"
      style={{ transform: `scaleX(${facing})` }}
      aria-hidden="true"
    >
      {rows.flatMap((row, y) =>
        row.split('').map((c, x) =>
          c === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette[c]} />
        )
      )}
    </svg>
  )
}
