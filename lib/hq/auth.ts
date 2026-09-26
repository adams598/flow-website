import { cookies } from 'next/headers'
import { createHash, timingSafeEqual } from 'crypto'

export const HQ_SESSION_COOKIE = 'flow-hq-session'

function sessionToken(): string {
  const secret = process.env.HQ_PASSWORD ?? ''
  return createHash('sha256').update(`flow-hq:${secret}`).digest('hex')
}

export function verifyHqPassword(password: string): boolean {
  const expected = process.env.HQ_PASSWORD
  if (!expected) {
    if (process.env.NODE_ENV === 'development' && password === 'flow-hq-dev') return true
    return false
  }
  const a = Buffer.from(password)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function isHqAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const value = cookieStore.get(HQ_SESSION_COOKIE)?.value
  return value === sessionToken()
}

export function hqSessionCookieValue(): string {
  return sessionToken()
}
