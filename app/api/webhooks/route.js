import { Webhook } from "svix"
import db from "@/config/connectDB"
import { usersTable } from "@/app/drizzle/Schema"
import { eq } from "drizzle-orm"

export async function POST(req) {

    try {

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //Verify the request
        const body = await req.text()

        const event = whook.verify(body, {
            "svix-id": req.headers.get("svix-id"),
            "svix-timestamp": req.headers.get("svix-timestamp"),
            "svix-signature": req.headers.get("svix-signature")
        })

        const { type, data } = event;

        switch (type) {

            case 'user.created':

                console.log(data);

                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }

                // Save it to a database
                let res = await db.insert(usersTable).values(userData)

                console.log(res);

                return Response.json({})

            case 'user.updated':

                const updatedUserData = {
                    name: data.first_name + " " + data.last_name,
                    email: data.email_addresses[0].email_address,
                    image: data.image_url
                }

                // Update it in a database
                await db.update(usersTable).set(updatedUserData).where(eq(usersTable._id, data.id))

                return Response.json({})

            case 'user.deleted':

                // remove them from a database
                await db.delete(usersTable).where(eq(usersTable._id, data.id));

                return Response.json({})

            default:
                console.log(`Unhandled event type: ${type}`);
                break;

        }

    } catch (error) {
        console.error("Error processing webhook:", error);
        return Response.json({ error: "Webhook processing failed" }, { status: 500 });

    }

}