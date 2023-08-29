ALTER TABLE `todos` RENAME COLUMN `content` TO `todo`;--> statement-breakpoint
ALTER TABLE `todos` ADD `desc` text;