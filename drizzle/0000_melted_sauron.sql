CREATE TABLE `tickets_user_key` (
	`id` varchar(15) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`hashed_password` varchar(255),
	CONSTRAINT `tickets_user_key_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tickets_user_session` (
	`id` varchar(128) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`active_expires` bigint NOT NULL,
	`idle_expires` bigint NOT NULL,
	CONSTRAINT `tickets_user_session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tickets_tickets` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(255),
	`status` enum('open','closed') NOT NULL DEFAULT 'open',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tickets_tickets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tickets_auth_user` (
	`id` varchar(15) NOT NULL,
	`username` varchar(150) NOT NULL,
	`role` enum('admin','user') NOT NULL DEFAULT 'user',
	CONSTRAINT `tickets_auth_user_id` PRIMARY KEY(`id`),
	CONSTRAINT `tickets_auth_user_username_unique` UNIQUE(`username`)
);
