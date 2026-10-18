import { mysqlTable, varchar, int } from 'drizzle-orm/mysql-core';

// Auth User Table : Clerk
export const usersTable = mysqlTable('users_table', {
    _id: varchar({ length: 100 }).primaryKey().notNull(),
    name: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 250 }).notNull().unique(),
    image: varchar({ length: 1000 }).notNull(),
});

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