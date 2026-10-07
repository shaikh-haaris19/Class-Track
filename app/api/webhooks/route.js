import { Webhook } from "svix"
import db from "@/config/connectDB"
import { usersTable } from "@/app/drizzle/Schema"
import { eq } from "drizzle-orm"

export async function POST(req) {

    console.log("Webhook Request Received");

    try {

        console.log("Webhook Start");

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        console.log("Instance of Webhook Created");

        //Verify the request
        const body = await req.text()

        const event = whook.verify(body, {
            "svix-id": req.headers.get("svix-id"),
            "svix-timestamp": req.headers.get("svix-timestamp"),
            "svix-signature": req.headers.get("svix-signature")
        })

        console.log(event)

        const { type, data } = event;

        console.log("Event Type : ", type);
        console.log("Event Data : ", data);

        switch (type) {

            case 'user.created':

                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }

                console.log("User Created : ", userData);

                // Save it to a database
                await db.insert(usersTable).values(userData)

                console.log("User Created in Database");

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
        console.log("Webhook Error =================================")
        console.error("Error processing webhook:", error.message);
        return Response.json({ error: "Webhook processing failed" }, { status: 500 });

    }

}