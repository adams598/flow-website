import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { detectLocale, isLocale, localeCookie } from '@/lib/i18n/config'

const PUBLIC_FILE = /\.[^/]+$/

function countryFromRequest(request: NextRequest) {
  return request.headers.get('x-vercel-ip-country')
}

function setLocaleCookie(response: NextResponse, locale: string) {
  response.cookies.set(localeCookie, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const first = pathname.split('/')[1]
  if (isLocale(first)) {
    const response = NextResponse.next()
    if (request.cookies.get(localeCookie)?.value !== first) {
      setLocaleCookie(response, first)
    }
    return response
  }

  const locale = detectLocale({
    cookie: request.cookies.get(localeCookie)?.value,
    acceptLanguage: request.headers.get('accept-language'),
    country: countryFromRequest(request),
  })

  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
  return setLocaleCookie(NextResponse.redirect(url), locale)
}

export const proxyConfig = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)'],
}
