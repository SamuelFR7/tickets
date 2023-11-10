CREATE TABLE `tickets_tickets` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(255),
	`status` enum('open','closed') NOT NULL DEFAULT 'open',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tickets_tickets_id` PRIMARY KEY(`id`)
);
