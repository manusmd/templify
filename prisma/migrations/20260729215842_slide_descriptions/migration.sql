-- CreateTable
CREATE TABLE "SlideDescription" (
    "key" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SlideDescription_pkey" PRIMARY KEY ("key")
);
