import supertest from 'supertest';

/* import { prismaMock } from "./lib/prisma/client.mock" */
import server from "./server";

const simulation = supertest(server);

/* ------------------ */
/* PAGE TEST: LISTING */
/* ------------------ */
describe("Test pages", () => {
    test("listing.html", async () => {
        const response = await simulation
            .get("/listing")
            .expect(200)
            .expect("Content-Type", /text\/html/)

        expect(response.text).toContain("Listing page")
    })
})
