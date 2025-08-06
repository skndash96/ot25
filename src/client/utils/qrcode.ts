'use client'
import { Session } from 'next-auth'
import QRCodeStyling from 'qr-code-styling'

const width = 400
const height = 520
const bgColor = '#111'
const borderColor = '#f59e0b'
const textColor = '#facc15'

function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

async function loadFont() {
  await document.fonts.load("18px 'Clash Display', sans-serif")
}

async function drawProfileImage(ctx: CanvasRenderingContext2D, user: Session['user']) {
  const radius = 50
  const centerX = width / 2
  const centerY = 90

  if (!user.image || user.image.startsWith('http')) {
    drawInitials(ctx, user, centerX, centerY, radius)
    return
  }

  await new Promise<void>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      ctx.save()
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(img, centerX - radius, centerY - radius, radius * 2, radius * 2)
      ctx.restore()
      resolve()
    }
    img.onerror = reject
    img.src = user.image!
  })
}

function drawInitials(
  ctx: CanvasRenderingContext2D,
  user: Session['user'],
  cx: number,
  cy: number,
  radius: number,
) {
  const initials = user
    .name!.split(' ')
    .slice(0, 2)
    .map((w) => w[0] || '')
    .join('')
    .toUpperCase()
  ctx.fillStyle = borderColor
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#000'
  ctx.font = 'bold 28px "Clash Display"'
  ctx.textAlign = 'center'
  ctx.fillText(initials, cx, cy - 14)
}

function drawFields(
  ctx: CanvasRenderingContext2D,
  fields: { label: string; value: string }[],
  startX: number,
  startY: number,
  maxWidth: number,
  lineHeight: number,
) {
  ctx.textBaseline = 'top'
  ctx.textAlign = 'left'

  const fieldFont = '16px "Clash Display"'
  const valueFont = 'bold 16px "Clash Display"'

  ctx.font = fieldFont
  const labelWidths = fields.map((f) => ctx.measureText(f.label + ':').width)
  const maxLabelWidth = Math.max(...labelWidths) + 12

  let y = startY

  for (const { label, value } of fields) {
    ctx.font = fieldFont
    ctx.fillStyle = '#fcd34d'
    ctx.fillText(label + ':', startX, y)

    ctx.font = valueFont
    ctx.fillStyle = textColor

    const words = value.split(' ')
    let line = ''
    const lines: string[] = []

    for (const word of words) {
      const testLine = line + word + ' '
      const testWidth = ctx.measureText(testLine).width

      if (testWidth > maxWidth - maxLabelWidth && line !== '') {
        lines.push(line)
        line = word + ' '
      } else {
        line = testLine
      }
    }
    if (line) lines.push(line)

    for (const l of lines) {
      ctx.fillText(l.trim(), startX + maxLabelWidth, y)
      y += lineHeight
    }

    y += 4
  }
}

async function drawQRCode(
  ctx: CanvasRenderingContext2D,
  token: string,
  size: number,
  x: number,
  y: number,
) {
  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: 'svg',
    data: token,
    image: '/logo_short_white.png',
    dotsOptions: {
      color: '#facc15',
      type: 'extra-rounded',
    },
    backgroundOptions: {
      color: '#111111',
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 12,
    },
  })

  await new Promise<void>(async (resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, x, y, size, size)
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillStyle = textColor
      ctx.fillText('QR Code', width / 2, y + size + 14)
      resolve()
    }
    img.onerror = reject
    const blob = await qrCode.getRawData('png') as Blob
    const url = URL.createObjectURL(blob!)
    img.src = url
    document.body.appendChild(img)
  })
}

function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL()
  link.click()
}

export async function generateAndDownloadIDCard(
  user: Session['user'],
  token: string,
): Promise<void> {
  const canvas = createCanvas()
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  await loadFont()

  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, width, height)

  await drawProfileImage(ctx, user)

  drawFields(
    ctx,
    [
      { label: 'Name', value: user.name! },
      { label: 'Roll Number', value: user.rollNumber! },
      { label: 'Department', value: user.department! },
      { label: 'Gender', value: user.gender!.toUpperCase() },
      { label: 'Phone', value: user.phoneNumber! },
    ],
    40,
    180,
    320,
    22,
  )

  const qrSize = 180
  const qrX = width / 2 - qrSize / 2
  const qrY = height - 200

  await drawQRCode(ctx, token, qrSize, qrX, qrY)

  downloadCanvas(canvas, `${user.rollNumber || 'id'}.png`)
}
