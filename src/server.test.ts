import supertest from 'supertest';

import { prismaMock } from "./lib/prisma/client.mock"
import server from "./server";

const simulation = supertest(server);

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


describe("POST /planets", () => {
    test("Valid request", async () => {
        const newMockPlanet =
        {
            "name": "Pluto",
            "description": "Small planet, big heart",
            "diameter": 500000,
            "moons": 0,
        }

        const response = await simulation
            .post("/planets")
            .send(newMockPlanet)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        expect(response.body).toEqual(newMockPlanet)
    })

    test("Invalid request", async () => {
        const newMockPlanet =
        {
            // PURPOSEFULLY OMIT THIS MANDATORY PROPERTY: "name": "Pluto",
            "description": "Small planet, big heart",
            "diameter": 500000,
            "moons": 0,
        }

        const response = await simulation
            .post("/planets")
            .send(newMockPlanet)
            .expect(422) // HTTP Unprocessable entity
            .expect("Content-Type", /application\/json/)

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        })
    })
})
