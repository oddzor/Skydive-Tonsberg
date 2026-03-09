import { NextRequest, NextResponse } from 'next/server'

const locales = ['no', 'en'] as const

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocale = locales.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  if (hasLocale) {
    return NextResponse.next()
  }
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? '/no/hjem' : `/no${pathname}`
  return NextResponse.redirect(url, 301)
}

export const config = {
  matcher: ['/((?!_next|api|admin|.*\\..*).*)'],
}
