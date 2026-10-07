import { Webhook } from "svix"
import db from "@/config/connectDB"
import { usersTable } from "@/app/drizzle/Schema"
import { eq } from "drizzle-orm"

export async function POST(req) {

    return Response.json({
        test: "THIS IS THE LATEST WEBHOOK CODE"
    });

}