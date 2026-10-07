import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

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