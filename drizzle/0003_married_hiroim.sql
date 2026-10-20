CREATE TABLE `attendance_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentId` int NOT NULL,
	`present` boolean DEFAULT false,
	`day` int NOT NULL,
	`date` varchar(10) NOT NULL,
	CONSTRAINT `attendance_table_id` PRIMARY KEY(`id`)
);
