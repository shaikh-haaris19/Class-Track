import { NextResponse } from "next/server";
import db from "@/config/connectDB";
import { gradesTable } from "@/app/drizzle/Schema";

export async function GET(request) {

    try {

        const result = await db.select().from(gradesTable);

        return NextResponse.json(result);

    } catch (error) {

        console.error("Error fetching grades:", error);
        return NextResponse.json({ error: "Failed to fetch grades" }, { status: 500 });

    }

}