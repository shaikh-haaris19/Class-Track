CREATE TABLE `grades_table` (
	`_id` varchar(100) NOT NULL,
	`grade` varchar(100) NOT NULL,
	CONSTRAINT `grades_table__id` PRIMARY KEY(`_id`)
);
--> statement-breakpoint
CREATE TABLE `students_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentName` varchar(20) NOT NULL,
	`studentGrade` varchar(10) NOT NULL,
	`contactNumber` varchar(10) NOT NULL,
	`studentAddress` varchar(100) NOT NULL,
	CONSTRAINT `students_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`_id` varchar(100) NOT NULL,
	`name` varchar(100) NOT NULL,
	`email` varchar(250) NOT NULL,
	`image` varchar(1000) NOT NULL,
	CONSTRAINT `users_table__id` PRIMARY KEY(`_id`),
	CONSTRAINT `users_table_email_unique` UNIQUE(`email`)
);
