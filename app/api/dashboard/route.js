import { NextResponse } from "next/server";
import db from "@/config/connectDB";
import { attendanceTable, studentsTable } from "@/app/drizzle/Schema";
import { and, desc, eq, sql } from "drizzle-orm";

export async function GET(request) {

    try {

        const searchParams = request.nextUrl.searchParams;
        const date = searchParams.get('date');
        const grade = searchParams.get('grade');

        const response = await db.select({
            day: attendanceTable.day,
            presentCount: sql`count(${attendanceTable.day})`,
        })
            .from(attendanceTable)
            .innerJoin(
                studentsTable,
                and(
                    eq(attendanceTable.studentId, studentsTable.id),
                )
            )
            .groupBy(attendanceTable.day)
            .where(
                and(
                    eq(studentsTable.studentGrade, grade),
                    eq(attendanceTable.date, date),
                    eq(attendanceTable.present, 1)
                )
            )
            .orderBy(desc(attendanceTable.day))
            .limit(7);

        return NextResponse.json(response);

    } catch (error) {

        console.error("Error fetching attendance data:", error);
        return NextResponse.json({ error: "Failed to fetch attendance data" }, { status: 500 });

    }

}   