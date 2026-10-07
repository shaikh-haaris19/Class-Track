CREATE TABLE `users_table` (
	`_id` varchar(100) NOT NULL,
	`name` varchar(100) NOT NULL,
	`email` varchar(250) NOT NULL,
	`image` varchar(500) NOT NULL,
	CONSTRAINT `users_table__id` PRIMARY KEY(`_id`),
	CONSTRAINT `users_table_email_unique` UNIQUE(`email`)
);
