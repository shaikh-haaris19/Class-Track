import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(async (auth, req) => {

    // Protect Every Route
    await auth.protect();

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