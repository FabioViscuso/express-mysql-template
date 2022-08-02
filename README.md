# Express/TS/SQL Backend Template

This aims to be a template for creating backends that communicate
with a SQL database, using Prisma as the ORM.
Includes a full REST API for CRUD operations and a simple auth system.
Handles input validation and has a full test suite.

List of dependencies:

CORE
- Express v4.18
- TypeScript (types included for applicable dependencies)
- Prisma ORM (tuned for PostgreSQL)
- CORS

DEV
- nodemon
- .env files support
- eslint support
- Testing w/Jest

VALIDATION
- Typebox
- express-json-validator-middleware
- ajv-formats
