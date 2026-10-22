import { NextResponse } from "next/server";
import db from "@/config/connectDB";
import { attendanceTable, studentsTable } from "@/app/drizzle/Schema";
import { eq, and } from "drizzle-orm";

// GET ATTENDANCE DATA THAT MATCHES THE SPECIFIED GRADE AND MONTH
export async function GET(request) {

    try {

        const searchParams = request.nextUrl.searchParams;
        const grade = searchParams.get("grade");
        const month = searchParams.get("month");

        // LEFT JOIN STUDENTS AND ATTENDANCE TABLES TO GET ATTENDANCE DATA FOR THE SPECIFIED GRADE AND MONTH
        const response = await db.select({
            studentId: studentsTable.id,
            name: studentsTable.studentName,
            grade: studentsTable.studentGrade,
            attendanceId: attendanceTable.id,
            present: attendanceTable.present,
            day: attendanceTable.day,
            date: attendanceTable.date
        })
            .from(studentsTable)
            .leftJoin(attendanceTable,
                and(
                    eq(studentsTable.id, attendanceTable.studentId),
                    eq(attendanceTable.date, month)
                )
            )
            .where(eq(studentsTable.studentGrade, grade));


        return NextResponse.json(response);

    } catch (error) {
        console.error("Error fetching attendance data:", error);
        return NextResponse.json({ error: "Failed to fetch attendance data" }, { status: 500 });
    }

}


// SET ATTENDANCE FOR STUDENTS
export async function POST(request) {

    try {

        const studentData = await request.json();

        const response = await db.insert(attendanceTable).values({
            studentId: studentData.studentId,
            present: studentData.present,
            day: studentData.day,
            date: studentData.date
        });

        return NextResponse.json({ message: "Attendance updated successfully" });

    } catch (error) {
        console.error("Error updating attendance data:", error);
        return NextResponse.json({ error: "Failed to update attendance data" }, { status: 500 });
    }

}


// MARK STUDENT AS ABSENT FOR A SPECIFIC DAY
export async function DELETE(request) {

    try {

        const { studentId, day, date } = await request.json();
        console.log("Received DELETE request with data:", { studentId, day, date });

        const response = await db.delete(attendanceTable).where(
            and(
                eq(attendanceTable.studentId, studentId),
                eq(attendanceTable.day, day),
                eq(attendanceTable.date, date)
            )
        );

        return NextResponse.json({ message: "Attendance deleted successfully" });

    } catch (error) {
        console.error("Error deleting attendance data:", error);
        return NextResponse.json({ error: "Failed to delete attendance data" }, { status: 500 });
    }

}