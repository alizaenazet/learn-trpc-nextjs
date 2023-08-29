CREATE TABLE `todos` (
	`id` int NOT NULL,
	`content` text,
	`isDone` boolean,
	CONSTRAINT `todos_id` PRIMARY KEY(`id`)
);
