import crypto from 'node:crypto'

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(12)
  const secret = Buffer.from(process.env.QR_CODE_SECRET!, 'hex') 
  const cipher = crypto.createCipheriv('aes-256-gcm', secret, iv)

  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()

  return Buffer.concat([iv, authTag, encrypted]).toString('base64')
}