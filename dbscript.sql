create table "users"(
	"id" serial,
	"firstname" varchar,
	"lastname" varchar,
	"email" varchar,
	"password" varchar,
	"created_date " timestamp,
	
	constraint pk_users primary key ("id")
) ; 