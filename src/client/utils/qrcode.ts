'use client'
import { Session } from 'next-auth'
import QRCodeStyling from 'qr-code-styling'

const width = 400
const height = 550
const bgColor = '#0f0f23'
const primaryColor = '#f59e0b'
const textColor = '#facc15'
const labelColor = '#fcd34d'
const cardPadding = 20

function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

async function loadFont() {
  await document.fonts.load("18px 'Clash Display', sans-serif")
}

function drawCardBackground(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, width, height)

  const borderRadius = 12
  const borderWidth = 3

  ctx.strokeStyle = primaryColor
  ctx.lineWidth = borderWidth
  ctx.beginPath()
  ctx.roundRect(
    cardPadding / 2,
    cardPadding / 2,
    width - cardPadding,
    height - cardPadding,
    borderRadius,
  )
  ctx.stroke()
}

async function drawProfileImage(ctx: CanvasRenderingContext2D, user: Session['user']) {
  const radius = 65
  const centerX = width / 2
  const centerY = 100

  ctx.strokeStyle = primaryColor
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius + 6, 0, Math.PI * 2)
  ctx.stroke()

  if (!user.image || !user.image.startsWith('http')) {
    drawInitials(ctx, user, centerX, centerY, radius)
    return
  }

  try {
    await new Promise<void>((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        ctx.save()
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()

        const imgAspect = img.width / img.height
        let drawWidth = radius * 2
        let drawHeight = radius * 2
        let drawX = centerX - radius
        let drawY = centerY - radius

        if (imgAspect > 1) {
          drawHeight = drawWidth / imgAspect
          drawY = centerY - drawHeight / 2
        } else {
          drawWidth = drawHeight * imgAspect
          drawX = centerX - drawWidth / 2
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
        ctx.restore()
        resolve()
      }
      img.onerror = (e) => {
        console.error(e)
        drawInitials(ctx, user, centerX, centerY, radius)
        resolve()
      }
      img.src = user.image!
    })
  } catch (e) {
    console.error(e)
    drawInitials(ctx, user, centerX, centerY, radius)
  }
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

  ctx.fillStyle = primaryColor
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#000'
  ctx.font = 'bold 36px "Clash Display"'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(initials, cx, cy)
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

  const labelFont = 'bold 14px "Clash Display"'
  const valueFont = '16px "Clash Display"'

  ctx.font = labelFont
  const labelWidths = fields.map((f) => ctx.measureText(f.label.toUpperCase() + ':').width)
  const maxLabelWidth = Math.max(...labelWidths) + 15

  let y = startY

  for (let i = 0; i < fields.length; i++) {
    const { label, value } = fields[i]

    ctx.fillStyle = primaryColor
    ctx.fillRect(startX - 10, y - 2, 3, 22)

    ctx.font = labelFont
    ctx.fillStyle = labelColor
    ctx.fillText(label.toUpperCase(), startX, y)

    ctx.font = valueFont
    ctx.fillStyle = textColor
    ctx.fillText(value, startX + maxLabelWidth, y)

    y += lineHeight + 8
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
    type: 'canvas',
    shape: 'square',
    width: 300,
    height: 300,
    data: token,
    margin: 0,
    qrOptions: {
      mode: 'Byte',
      errorCorrectionLevel: 'M',
    },
    imageOptions: {
      saveAsBlob: true,
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 12,
    },
    dotsOptions: {
      type: 'extra-rounded',
      color: '#ff8000',
      roundSize: true,
    },
    backgroundOptions: { round: 0, color: '#00000000' },
    image: '/logo_short_white.png',
    cornersSquareOptions: { type: 'extra-rounded', color: '#ff8040' },
    cornersDotOptions: { type: 'rounded', color: '#f59e0b' },
  })

  try {
    await new Promise<void>(async (resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, x, y, size, size)

        ctx.font = 'bold 12px "Clash Display"'
        ctx.textAlign = 'center'
        ctx.fillStyle = labelColor
        ctx.fillText('SCAN FOR VERIFICATION', width / 2, y + size + 20)

        resolve()
      }
      img.onerror = reject

      const blob = (await qrCode.getRawData('png')) as Blob
      if (blob) {
        const url = URL.createObjectURL(blob)
        img.src = url
      } else {
        reject(new Error('Failed to generate QR code'))
      }
    })
  } catch (error) {
    console.error('QR Code generation failed:', error)

    ctx.fillStyle = primaryColor
    ctx.fillRect(x, y, size, size)
    ctx.font = 'bold 14px "Clash Display"'
    ctx.textAlign = 'center'
    ctx.fillStyle = textColor
    ctx.fillText('QR CODE', width / 2, y + size / 2)
    ctx.fillText('UNAVAILABLE', width / 2, y + size / 2 + 20)
  }
}

function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png', 1.0)
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

  drawCardBackground(ctx)
  await drawProfileImage(ctx, user)

  drawFields(
    ctx,
    [
      { label: 'Name', value: user.name ? (user.name.slice(0,25) + (user.name.length > 25 ? ".." : "")) : "" },
      { label: 'Roll Number', value: user.rollNumber! },
      { label: 'Department', value: user.department! },
      {
        label: 'Gender',
        value: user.gender!.charAt(0).toUpperCase() + user.gender!.slice(1).toLowerCase(),
      },
      { label: 'Phone', value: user.phoneNumber! },
    ],
    cardPadding + 20,
    190,
    width - (cardPadding + 20) * 2,
    18,
  )

  const qrSize = 150
  const qrX = width / 2 - qrSize / 2
  const qrY = height - 210

  await drawQRCode(ctx, token, qrSize, qrX, qrY)

  downloadCanvas(canvas, `${user.rollNumber}-${user.id}`)
}
