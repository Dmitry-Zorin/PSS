-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "info" TEXT,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "typeName" TEXT NOT NULL,
    "publicationForm" TEXT,
    "publicationPlace" TEXT,
    "publicationYear" INTEGER NOT NULL,
    "pageCount" INTEGER NOT NULL DEFAULT 1,
    "coauthors" TEXT[],
    "extraData" TEXT,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorToPublication" (
    "authorId" INTEGER NOT NULL,
    "publicationId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "AuthorToPublication_pkey" PRIMARY KEY ("authorId","publicationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Publication_title_key" ON "Publication"("title");

-- AddForeignKey
ALTER TABLE "AuthorToPublication" ADD CONSTRAINT "AuthorToPublication_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorToPublication" ADD CONSTRAINT "AuthorToPublication_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
