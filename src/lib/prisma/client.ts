/* Import Prisma Client */
import { PrismaClient } from "@prisma/client";

/* Then we create an instance of Prisma client to be able to make queries */
const prisma = new PrismaClient()

export default prisma;
