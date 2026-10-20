import { mysqlTable, varchar, int, boolean } from 'drizzle-orm/mysql-core';


// Auth User Table : Clerk
export const usersTable = mysqlTable('users_table', {
    _id: varchar({ length: 100 }).primaryKey().notNull(),
    name: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 250 }).notNull().unique(),
    image: varchar({ length: 1000 }).notNull(),
});


// Grades Table
export const gradesTable = mysqlTable('grades_table', {
    _id: varchar({ length: 100 }).primaryKey().notNull(),
    grade: varchar({ length: 100 }).notNull(),
});


// Students Table
export const studentsTable = mysqlTable('students_table', {
    id: int().primaryKey().autoincrement(),
    studentName: varchar({ length: 20 }).notNull(),
    studentGrade: varchar({ length: 10 }).notNull(),
    contactNumber: varchar({ length: 10 }).notNull(),
    studentAddress: varchar({ length: 100 }).notNull(),
});


// Attendance Table
export const attendanceTable = mysqlTable('attendance_table', {
    id: int().primaryKey().autoincrement(),
    studentId: int().notNull(),
    present: boolean().default(false),          // Attendance status 
    day: int().notNull(),                       // Day of the month (1-31)
    date: varchar({ length: 10 }).notNull(),    // Month-Year "MM-DD"
})