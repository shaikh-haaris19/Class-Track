import { Webhook } from "svix"

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

        const { type, data } = event

        switch (type) {

            case 'user.created':

                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }

                // save it to a database
                console.log(userData);
                Response.json({})
                break;

            case 'user.updated':

                const updatedUserData = {
                    name: data.first_name + " " + data.last_name,
                    email: data.email_addresses[0].email_address,
                    image: data.image_url
                }

                // Update it to a database
                console.log(updatedUserData);
                Response.json({})
                break;

            case 'user.deleted':

                // remove them from a database
                console.log(`User with ID ${data.id} has been deleted.`);
                Response.json({})
                break;

            default:
                console.log(`Unhandled event type: ${type}`);
                break;

        }

    } catch (error) {

        console.error("Error processing webhook:", error);
        res.json({ error: "Webhook processing failed" }, { status: 500 });

    }

}