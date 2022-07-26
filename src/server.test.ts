import supertest from 'supertest';

import server from "./server"

const simulation = supertest(server);

test("GET /", async () => {
    const response = await simulation
        .get("/")
        .expect(200)
        .expect("Content-Type", 'application/json')

    expect(response.body).toEqual({ message: "Hello!" })
})
