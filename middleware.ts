import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isCoordinatorRoute = createRouteMatcher(['/admin(.*)'])
const isVolunteerRoute = createRouteMatcher(['/volunteer(.*)'])

export default clerkMiddleware(async (auth, req) => {
  let role = (await auth()).sessionClaims?.metadata?.role

  if (isCoordinatorRoute(req) && role !== 'coordinator') {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }

  if (isVolunteerRoute(req) && role !== 'volunteer') {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}