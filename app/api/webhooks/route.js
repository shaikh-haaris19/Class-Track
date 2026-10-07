import { Webhook } from "svix"
import db from "@/config/connectDB"
import { usersTable } from "@/app/drizzle/Schema"
import { eq } from "drizzle-orm"

export async function POST(req) {

    try {
        const body = await req.text();

        const whook = new Webhook(
            process.env.CLERK_WEBHOOK_SECRET
        );

        const event = whook.verify(body, {
            "svix-id": req.headers.get("svix-id"),
            "svix-timestamp": req.headers.get("svix-timestamp"),
            "svix-signature": req.headers.get("svix-signature"),
        });

        return Response.json({
            success: true,
            event: event
        });

    } catch (error) {

        console.error("WEBHOOK ERROR:", error);

        return Response.json(
            {
                success: false,
                error: error.message
            },
            { status: 500 }
        );
    }
}