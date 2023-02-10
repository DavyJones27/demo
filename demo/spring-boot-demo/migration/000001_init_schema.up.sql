CREATE TABLE "users" (
  "id" varchar PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "gender" varchar NOT NULL,
  "email" varchar UNIQUE,
  "dob" date NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  "qualifications_id" varchar NOT NULL
);

CREATE TABLE "qualifications" (
  "id" varchar PRIMARY KEY,
  "education" varchar NOT NULL,
  "salary" bigint NOT NULL,
  "doj" date NOT NULL,
  "skills" text ARRAY,
  "role" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX ON "users" ("email");

CREATE INDEX ON "qualifications" ("role");

ALTER TABLE "users" ADD FOREIGN KEY ("qualifications_id") REFERENCES "qualifications" ("id");