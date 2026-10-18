import { NextResponse } from "next/server";
import db from "@/config/connectDB";
import { studentsTable } from "@/app/drizzle/Schema";


// ADD NEW STUDENT ROUTE
export async function POST(request) {

    try {

        const data = await request.json();

        const { studentName, contactNumber, studentAddress, studentGrade } = data;

        const result = await db.insert(studentsTable).values({
            studentName,
            contactNumber,
            studentAddress,
            studentGrade
        });

        return NextResponse.json(result);

    } catch (error) {
        console.error("Error adding student:", error);
        return NextResponse.json({ error: "Failed to add student" }, { status: 500 });
    }

}


// GET ALL STUDENTS ROUTE
export async function GET(request) {

    try {

        const response = await db.select().from(studentsTable);

        return NextResponse.json(response);

    } catch (error) {
        console.error("Error fetching students:", error);
        return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
    }
    
}