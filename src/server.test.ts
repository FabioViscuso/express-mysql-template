import supertest from 'supertest';

import { prismaMock } from "./lib/prisma/client.mock"
import server from "./server";

const simulation = supertest(server);

/* ------------------ */
/* CRUD TEST: GET ALL */
/* ------------------ */
describe("GET /planets", () => {
    test("Valid request", async () => {
        const mockPlanets = [
            {
                "id": 1,
                "name": "Earth",
                "description": "The planet we live on",
                "diameter": 3600000,
                "moons": 1,
                "createdAt": "2022-08-01T09:19:41.975Z",
                "updatedAt": "2022-08-01T15:42:05.944Z"
            },
            {
                "id": 2,
                "name": "Venus",
                "description": "Earth's evil twin",
                "diameter": 2666000,
                "moons": 0,
                "createdAt": "2022-08-01T09:20:24.311Z",
                "updatedAt": "2022-08-01T15:42:05.944Z"
            }
        ]

        //! KNOWN ISSUE WITH PRISMA
        // @ts-ignore
        prismaMock.planet.findMany.mockResolvedValue(mockPlanets);

        const response = await simulation
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect(response.body).toEqual(mockPlanets)
    })
})
/* ----------------- */
/* CRUD TEST: GET ALL */
/* ----------------- */




/* -------------------- */
/* CRUD TEST: GET BY ID */
/* -------------------- */
describe("GET /planets/:id", () => {
    /* VALID REQUEST */
    test("Valid request (element found)", async () => {
        const mockPlanet =
        {
            "id": 1,
            "name": "Earth",
            "description": "The planet we live on",
            "diameter": 3600000,
            "moons": 1,
            "createdAt": "2022-08-01T09:19:41.975Z",
            "updatedAt": "2022-08-01T15:42:05.944Z"
        }

        //! KNOWN ISSUE WITH PRISMA
        // @ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(mockPlanet);

        const response = await simulation
            .get("/planets/1")
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect(response.body).toEqual(mockPlanet)
    })
    /* END OF VALID REQUEST */


    /* INVALID REQUEST: MISSING ELEMENT */
    test("Invalid request (no such element)", async () => {
        prismaMock.planet.findUnique.mockResolvedValue(null);

        const response = await simulation
            .get("/planets/99")
            .expect(404)
            .expect("Content-Type", /text\/html/)

        expect(response.text).toContain("Cannot GET /planets/99. Element does not exist")

    })
    /* END OF INVALID REQUEST: MISSING ELEMENT */


    /* INVALID REQUEST: INVALID ID */
    test("Invalid request (invalid ID format)", async () => {
        const response = await simulation
            .get("/planets/qwerty")
            .expect(404)
            .expect("Content-Type", /text\/html/)

        expect(response.text).toContain("Cannot GET /planets/qwerty")
    })
    /* END OF INVALID REQUEST: INVALID ID */
})
/* -------------------- */
/* CRUD TEST: GET BY ID */
/* -------------------- */




/* ----------------- */
/* CRUD TEST: UPDATE */
/* ----------------- */
describe("PUT /planets/:id", () => {
    /* VALID REQUEST */
    test("Valid request", async () => {
        const mockPlanet =
        {
            "name": "Jupiter",
            "description": "The solar system's bigger brother",
            "diameter": 99000000,
            "moons": 18,
        }

        const updatedMockPlanet =
        {
            "id": 4,
            "name": "Jupiter",
            "description": "The solar system's bigger brother",
            "diameter": 99000000,
            "moons": 18,
            "createdAt": "2022-08-01T09:19:41.975Z",
            "updatedAt": "2022-08-01T15:42:05.944Z"
        }

        //! KNOWN ISSUE WITH PRISMA
        // @ts-ignore
        prismaMock.planet.update.mockResolvedValue(updatedMockPlanet);

        const response = await simulation
            .put("/planets/4")
            .send(mockPlanet)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect(response.body).toEqual(updatedMockPlanet)
    })
    /* END OF VALID REQUEST */


    /* INVALID REQUEST: BAD REQUEST */
    test("Invalid request: bad request", async () => {
        const mockPlanet =
        {
            "description": "Sounds sketchy",
            "diameter": 99000000,
            "moons": 18,
        }

        const response = await simulation
            .put("/planets/99")
            .send(mockPlanet)
            .expect(422)
            .expect("Content-Type", /application\/json/)

        expect(response.body).toEqual({
            message: "Something is wrong with your JSON, check attached log",
            errors: {
                body: expect.any(Array)
            }
        })
    })
    /* END OF INVALID REQUEST: BAD REQUEST */


    /* INVALID REQUEST: NO SUCH ENTRY */
    test("Invalid request: item not found", async () => {
        const mockPlanet =
        {
            "name": "Uranus",
            "description": "Sounds sketchy",
            "diameter": 99000000,
            "moons": 18,
        }

        prismaMock.planet.update.mockRejectedValue(new Error('Error'));

        const response = await simulation
            .put("/planets/99")
            .send(mockPlanet)
            .expect(404)
            .expect("Content-Type", /text\/html/)

        expect(response.text).toContain("Cannot PUT /planets/99. Element does not exist")
    })
    /* END OF INVALID REQUEST: NO SUCH ENTRY */


    /* INVALID REQUEST: INVALID ID FORMAT */
    test("Invalid request (invalid ID format)", async () => {
        const response = await simulation
            .put("/planets/qwerty")
            .expect(404)
            .expect("Content-Type", /text\/html/)

        expect(response.text).toContain("Cannot PUT /planets/qwerty")
    })
    /* END OF INVALID REQUEST: INVALID ID FORMAT */
})
/* ----------------- */
/* CRUD TEST: UPDATE */
/* ----------------- */




/* ----------------- */
/* CRUD TEST: CREATE */
/* ----------------- */
describe("POST /planets", () => {
    /* VALID REQUEST */
    test("Valid request", async () => {
        const newMockPlanet =
        {
            "name": "Mars",
            "description": "The infamous red planet",
            "diameter": 456000,
            "moons": 2,
        }

        const createdPlanet =
        {
            "id": 3,
            "name": "Mars",
            "description": "The infamous red planet",
            "diameter": 456000,
            "moons": 2,
            "createdAt": "2022-08-01T17:07:32.357Z",
            "updatedAt": "2022-08-01T17:07:32.358Z"
        }

        //! KNOWN ISSUE WITH PRISMA
        // @ts-ignore
        prismaMock.planet.create.mockResolvedValue(createdPlanet);

        const response = await simulation
            .post("/planets")
            .send(newMockPlanet)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        expect(response.body).toEqual(createdPlanet)
    })
    /* VALID REQUEST */


    /* INVALID REQUEST: INVALID FORMAT */
    test("Invalid request (doesn't follow schema)", async () => {
        const newMockPlanet =
        {
            // PURPOSEFULLY OMIT THIS MANDATORY PROPERTY: "name": "Pluto",
            "description": "Small planet, big heart",
            "diameter": 500000,
            "moons": 0,
        }

        //! KNOWN ISSUE WITH PRISMA
        // @ts-ignore
        prismaMock.planet.create.mockResolvedValue(newMockPlanet);

        const response = await simulation
            .post("/planets")
            .send(newMockPlanet)
            .expect(422) // HTTP Unprocessable entity
            .expect("Content-Type", /application\/json/)

        expect(response.body).toEqual({
            message: "Something is wrong with your JSON, check attached log",
            errors: {
                body: expect.any(Array)
            }
        })
    })
    /* INVALID REQUEST: INVALID FORMAT */
})
/* ----------------- */
/* CRUD TEST: CREATE */
/* ----------------- */



/* ----------------- */
/* CRUD TEST: DELETE */
/* ----------------- */
describe("DELETE /planets/:id", () => {
    /* VALID REQUEST */
    test("Valid request", async () => {
        const response = await simulation
            .delete("/planets/1")
            .expect(204) // No Content status code

        expect(response.text).toEqual("")
    })
    /* END OF VALID REQUEST */


    /* INVALID REQUEST: NO SUCH ENTRY */
    test("Invalid request: item not found", async () => {
        //! KNOWN ISSUE WITH PRISMA
        // @ts-ignore
        prismaMock.planet.delete.mockRejectedValue(new Error("Error"));

        const response = await simulation
            .delete("/planets/99")
            .expect(404)
            .expect("Content-Type", /text\/html/)

        expect(response.text).toContain("Cannot DELETE /planets/99. Element does not exist")
    })
    /* END OF INVALID REQUEST: NO SUCH ENTRY */


    /* INVALID REQUEST: INVALID ID FORMAT */
    test("Invalid request (invalid ID format)", async () => {
        const response = await simulation
            .delete("/planets/qwerty")
            .expect(404)
            .expect("Content-Type", /text\/html/)

        expect(response.text).toContain("Cannot DELETE /planets/qwerty")
    })
    /* END OF INVALID REQUEST: INVALID ID FORMAT */
})
/* ----------------- */
/* CRUD TEST: DELETE */
/* ----------------- */


/* -------------------- */
/* CRUD TEST: ADD PHOTO */
/* -------------------- */
describe('POST /planets/0/photo', () => {
    test('Invalid photo add: no file attached', async () => {
        const response = await simulation
            .post("/planets/qwerty/photo")
            .expect(404)
            .expect("Content-Type", /text\/html/)

        expect(response.text).toContain("no file provided")
    })

    test('Invalid photo add: invalid ID', async () => {
        const response = await simulation
            .post("/planets/0/photo")
            .expect(400)
            .expect("Content-Type", /text\/html/)

        expect(response.text).toContain("Cannot POST /planets/qwerty/photo, invalid id provided")
    })

    test('Valid photo add', async () => {
        const response = await simulation
            .post("/planets/0/photo")
            .attach("photo", "text-fixtures/photos/earth.png")
            .expect(201)
            .expect("Content-Type", /application\/json/)

        expect(response.body).toBe({ message: `photo added` })
    })
})
/* -------------------- */
/* CRUD TEST: ADD PHOTO */
/* -------------------- */
