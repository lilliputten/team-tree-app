-- CreateTable
CREATE TABLE "Records" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "parentId" INTEGER,
    CONSTRAINT "Records_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Records" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

