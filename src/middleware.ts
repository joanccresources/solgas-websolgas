 


// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   console.log(request.url,'request.url')
//   return NextResponse.redirect(new URL('/', request.url))
// }
 
 
import { NextResponse } from 'next/server';

export function middleware(request: { headers: HeadersInit | undefined; nextUrl: { pathname: string; }; }) {
  const requestHeaders = new Headers(request.headers); 
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}