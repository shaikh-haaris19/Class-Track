import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users_table', {
    _id: varchar({ length: 100 }).primaryKey().notNull(),
    name: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 250 }).notNull().unique(),
    image: varchar({ length: 1000 }).notNull(),
});
