import { NextResponse } from 'next/server'
import { HQ_SESSION_COOKIE, hqSessionCookieValue, verifyHqPassword } from '@/lib/hq/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string }
  const password = body.password ?? ''
  if (!verifyHqPassword(password)) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set(HQ_SESSION_COOKIE, hqSessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(HQ_SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 })
  return res
}
