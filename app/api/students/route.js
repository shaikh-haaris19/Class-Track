import { NextResponse } from "next/server";
import db from "@/config/connectDB";
import { studentsTable } from "@/app/drizzle/Schema";
import { eq } from "drizzle-orm";


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


// DELETE STUDENT ROUTE
export async function DELETE(request) {

    try {

        const searchParams = request.nextUrl.searchParams;
        const studentId = searchParams.get("id"); 

        if (!studentId) {
            return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
        }

        const result = await db.delete(studentsTable).where(eq(studentsTable.id, studentId));

        return NextResponse.json({ message: "Student deleted successfully", result });

    } catch (error) {
        console.error("Error deleting student:", error);
        return NextResponse.json({ error: "Failed to delete student" }, { status: 500 });
    }

}