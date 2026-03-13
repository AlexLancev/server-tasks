/*
  Warnings:

  - Added the required column `created_by` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'banned');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" UUID NOT NULL,
ADD COLUMN     "email" VARCHAR NOT NULL,
ADD COLUMN     "first_name" VARCHAR NOT NULL,
ADD COLUMN     "hash" VARCHAR,
ADD COLUMN     "last_name" VARCHAR NOT NULL,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'user',
ADD COLUMN     "status" "UserStatus" NOT NULL;
