import crypto from 'node:crypto'
import { chacha20poly1305 } from '@noble/ciphers/chacha'

export function encrypt(text: string): string {
  const key = Buffer.from(process.env.QR_CODE_SECRET!, 'hex')
  
  const iv = crypto.randomBytes(12)  // Use Noble's randomBytes
  const cipher = chacha20poly1305(key, iv)
  const encrypted = cipher.encrypt(Buffer.from(text, 'utf8'))

  return Buffer.concat([iv, encrypted]).toString('base64')
}
