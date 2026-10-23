import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(async (auth, req) => {

    const { isAuthenticated } = await auth();

    if (
        req.nextUrl.pathname === '/dashboard' ||
        req.nextUrl.pathname.startsWith('/dashboard/')
    ) {
        await auth.protect()
    }

    // FOR AUTHENTICATED USERS, REDIRECT TO DASHBOARD
    if (
        req.nextUrl.pathname === '/' && isAuthenticated
    ) {
        // Redirect to the dashboard
        return Response.redirect(
            new URL('/dashboard', req.url)
        );
    }

});

export const config = {

    /* 

    Matches All Path Except :
    * - _next/static (static files)
    * - _next/image (image optimization files)
    * - favicon.ico 
    * - public/ (public files)
    
    */

    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|public/).*)"
    ],
};