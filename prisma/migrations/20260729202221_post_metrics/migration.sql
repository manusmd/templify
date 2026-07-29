-- AlterTable
ALTER TABLE "SocialPost" ADD COLUMN     "metrics" JSONB,
ADD COLUMN     "metricsUpdatedAt" TIMESTAMP(3);
