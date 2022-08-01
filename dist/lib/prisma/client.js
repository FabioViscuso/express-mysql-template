"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Import Prisma Client */
const client_1 = require("@prisma/client");
/* Then we create an instance of Prisma client to be able to make queries */
const prisma = new client_1.PrismaClient();
exports.default = prisma;
//# sourceMappingURL=client.js.map