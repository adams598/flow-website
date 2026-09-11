const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const sharp = require('sharp')

const W = 1584
const H = 396
const ROOT = path.resolve(__dirname, '..')
const LOGO = path.join(ROOT, 'public', 'export.png')
const ATMOS =
  'C:/Users/adams/.cursor/projects/a-PROJETS-flow-website/assets/linkedin-banner-atmosphere.png'

function psEscape(p) {
  return p.replace(/'/g, "''")
}

function renderType(outFile, variant) {
  const isA = variant === 'a'
  const script = `
Add-Type -AssemblyName System.Drawing
$w = ${W}; $h = ${H}
$bmp = New-Object System.Drawing.Bitmap $w, $h
$bmp.SetResolution(72, 72)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.Color]::Transparent)

$white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(248, 250, 250))
$cyan  = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(125, 244, 255))
$mute  = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 202, 203))
$dot   = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(0, 229, 238))
$line  = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(120, 0, 229, 238)), 1.2
$family = 'Bahnschrift'
$wordFont = New-Object System.Drawing.Font $family, 30, ([System.Drawing.FontStyle]::Bold)
$tagFont  = New-Object System.Drawing.Font $family, 13, ([System.Drawing.FontStyle]::Regular)
$propFont = New-Object System.Drawing.Font $family, 14, ([System.Drawing.FontStyle]::Bold)

function DrawTracked($text, $font, $brush, $x, $y, $tracking) {
  foreach ($ch in $text.ToCharArray()) {
    $g.DrawString([string]$ch, $font, $brush, $x, $y)
    $x += [int]$g.MeasureString([string]$ch, $font).Width - 10 + $tracking
  }
}

${
  isA
    ? `
DrawTracked 'FLOW' $wordFont $white 400 118 11
$g.DrawLine($line, 400, 176, 472, 176)
$g.DrawString('Build digital. Make it flow.', $tagFont, $cyan, 400, 188)

$props = @('Sites web', 'Apps métier', 'Plateformes')
$px = 400
$py = 248
foreach ($p in $props) {
  $g.FillEllipse($dot, $px, $py + 8, 6, 6)
  $g.DrawString($p, $propFont, $white, $px + 12, $py)
  $px += [int]$g.MeasureString($p, $propFont).Width + 18
}
`
    : `
DrawTracked 'FLOW' $wordFont $white 392 108 11
$g.DrawString('Build digital. Make it flow.', $tagFont, $cyan, 392, 168)

$items = @('Sites web', 'Applications métier', 'Plateformes digitales')
$iy = 214
foreach ($item in $items) {
  $g.FillEllipse($dot, 392, $iy + 8, 7, 7)
  $g.DrawString($item, $propFont, $white, 408, $iy)
  $iy += 34
}
`
}

$bmp.Save('${psEscape(outFile)}', [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
$wordFont.Dispose(); $tagFont.Dispose(); $propFont.Dispose()
`
  const psPath = path.join(__dirname, `draw-type-${variant}.ps1`)
  fs.writeFileSync(psPath, `\ufeff${script}`, 'utf8')
  execFileSync('powershell', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', psPath], {
    stdio: 'inherit',
  })
}

async function extractChevron(height) {
  const { data, info } = await sharp(LOGO).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  let minX = info.width
  let minY = info.height
  let maxX = 0
  let maxY = 0
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 18) {
        if (x < minX) minX = x
        if (y < minY) minY = y
        if (x > maxX) maxX = x
        if (y > maxY) maxY = y
      }
    }
  }
  const pad = 6
  minX = Math.max(0, minX - pad)
  minY = Math.max(0, minY - pad)
  maxX = Math.min(info.width - 1, maxX + pad)
  maxY = Math.min(info.height - 1, maxY + pad)
  return sharp(LOGO)
    .ensureAlpha()
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
    .resize({ height, fit: 'inside' })
    .png()
    .toBuffer()
}

async function noise(width, height, opacity) {
  const buf = Buffer.alloc(width * height * 4)
  for (let i = 0; i < width * height; i++) {
    const n = 118 + Math.floor(Math.random() * 28)
    const o = i * 4
    buf[o] = n
    buf[o + 1] = n
    buf[o + 2] = n
    buf[o + 3] = opacity
  }
  return sharp(buf, { raw: { width, height, channels: 4 } }).png().toBuffer()
}

async function backgroundA() {
  const meta = await sharp(ATMOS).metadata()
  const cropH = Math.round(meta.width / 4)
  const top = Math.max(0, Math.round((meta.height - cropH) * 0.5))
  return sharp(ATMOS)
    .extract({
      left: 0,
      top,
      width: meta.width,
      height: Math.min(cropH, meta.height - top),
    })
    .resize(W, H, { fit: 'cover', position: 'right' })
    .modulate({ brightness: 0.62, saturation: 1.05 })
    .toBuffer()
}

function backgroundB() {
  return sharp(
    Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="r" cx="82%" cy="50%" r="48%">
          <stop offset="0%" stop-color="#0A3A40"/>
          <stop offset="42%" stop-color="#081416"/>
          <stop offset="100%" stop-color="#070808"/>
        </radialGradient>
        <linearGradient id="l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#050606"/>
          <stop offset="40%" stop-color="#070808"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#r)"/>
      <rect width="42%" height="100%" fill="url(#l)" opacity="0.55"/>
    </svg>`)
  )
    .png()
    .toBuffer()
}

function leftShade() {
  return Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#050606" stop-opacity="0.5"/>
          <stop offset="24%" stop-color="#050606" stop-opacity="0.18"/>
          <stop offset="48%" stop-color="#050606" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`)
}

async function compose(variant, bg, chevron, textPng, outName) {
  const meta = await sharp(chevron).metadata()
  const logoX = W - meta.width - 72
  const logoY = Math.round((H - meta.height) / 2)
  const glow = await sharp(chevron).blur(22).linear(0.42, 0).png().toBuffer()
  const glowMeta = await sharp(glow).metadata()
  const glowX = logoX - Math.round((glowMeta.width - meta.width) / 2)
  const glowY = logoY - Math.round((glowMeta.height - meta.height) / 2)
  const grain = await noise(W, H, 14)
  const pad = 120
  const work = await sharp({
    create: {
      width: W + pad * 2,
      height: H + pad * 2,
      channels: 4,
      background: { r: 7, g: 8, b: 8, alpha: 1 },
    },
  })
    .composite([
      { input: bg, left: pad, top: pad },
      { input: leftShade(), left: pad, top: pad },
      { input: glow, left: pad + glowX, top: pad + glowY, blend: 'screen' },
      { input: chevron, left: pad + logoX, top: pad + logoY },
      { input: grain, left: pad, top: pad, blend: 'overlay' },
      { input: textPng, left: pad, top: pad },
    ])
    .png()
    .toBuffer()

  await sharp(work)
    .extract({ left: pad, top: pad, width: W, height: H })
    .png()
    .toFile(path.join(ROOT, 'public', outName))

  console.log(outName, 'logo', meta.width, 'x', meta.height, 'at', logoX, logoY)
}

async function main() {
  const textA = path.join(__dirname, 'type-a.png')
  const textB = path.join(__dirname, 'type-b.png')
  renderType(textA, 'a')
  renderType(textB, 'b')

  const chevronA = await extractChevron(300)
  const chevronB = await extractChevron(320)
  const [bgA, bgB] = await Promise.all([backgroundA(), backgroundB()])

  await compose('a', bgA, chevronA, textA, 'linkedin-banner-a.png')
  await compose('b', bgB, chevronB, textB, 'linkedin-banner-b.png')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
