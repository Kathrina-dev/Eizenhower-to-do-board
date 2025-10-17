-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "taskID" SERIAL NOT NULL,
ALTER COLUMN "isDeleted" SET DEFAULT false,
ALTER COLUMN "isCompleted" SET DEFAULT false;
