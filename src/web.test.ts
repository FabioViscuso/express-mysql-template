import supertest from 'supertest';

/* import { prismaMock } from "./lib/prisma/client.mock" */
import server from "./server";

const simulation = supertest(server);

/* ------------------ */
/* PAGE TEST: LISTING */
/* ------------------ */
describe("Test pages", () => {
    test("list.html", async () => {
        const response = await simulation
            .get("/listing")
            .expect(200)
            .expect("Content-Type", /text\/html/)

        expect(response.text).toContain("Listing page")
    })

    test("add.html", async () => {
        const response = await simulation
            .get("/add")
            .expect(200)
            .expect("Content-Type", /text\/html/)

        expect(response.text).toContain("Add to DB page")
    })
})
