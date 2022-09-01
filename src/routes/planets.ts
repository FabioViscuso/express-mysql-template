import { Router } from "express";
import prisma from "../lib/prisma/client";
import { validate, planetSchema, PlanetSchema } from "../lib/validation";
import { checkAuthorization } from "../lib/middleware/passport";
import { initMulterMiddleware } from "../lib/middleware/multer";


const router = Router();

/* We import the main function in the multer middleware file */
const upload = initMulterMiddleware();

/*---------------- CRUD ENDPOINTS ----------------*/

/* Create new planet */
router.post("/", checkAuthorization, validate({ body: planetSchema }), async (req, res) => {
    /* If the req passes validation, this code will run */
    const incomingPlanetData: PlanetSchema = req.body;
    const username = req.user?.username;
    const newPlanet = await prisma.planet.create({
        data: {
            ...incomingPlanetData,
            createdBy: username,
            updatedBy: username
        }
    })
    res.status(201).json(newPlanet);
});

/* Read planets */
router.get("/", async (req, res) => {
    const planet = await prisma.planet.findMany();
    res.status(200).json(planet);
});

/* Read single planet by numeric ID */
router.get("/:id(\\d+)", async (req, res, next) => {
    const planetID = Number(req.params.id)
    const planet = await prisma.planet.findUnique({
        where: { id: planetID }
    });
    // if findUnique doesn't find a matching entry, it will return null
    if (!planet) {
        res.status(404)
        // pass the error to the express error handling middleware
        return next(`Cannot GET /planets/${planetID}. Element does not exist`)
    }

    res.status(200).json(planet)
});

/* Update planet */
router.put("/:id(\\d+)", checkAuthorization, validate({ body: planetSchema }), async (req, res, next) => {
    const planetID = Number(req.params.id)
    const incomingPlanetData: PlanetSchema = req.body;
    const username = req.user?.username as string;

    try {
        const planet = await prisma.planet.update({
            where: { id: planetID },
            data: { ...incomingPlanetData, updatedBy: username }
        });
        res.status(200).json(planet);
    } catch (err) {
        res.status(404);
        next(`Cannot PUT /planets/${planetID}. Element does not exist`);
    }
});

/* Add photo to a planet */
/*
    PLEASE NOTE: the "photo" name must be the same as the name of the input that
    handles the photo: <input type="file" name="photo">
 */
router.post("/:id(\\d+)/photo", upload.single("photo"), checkAuthorization, async (req, res, next) => {
    console.log(req.file)
    if (!req.file) {
        res.status(400)
        return next("no file provided")
    }


    const planetID = Number(req.params.id)

    try {
        await prisma.planet.update({
            where: {
                id: planetID
            },
            data: {
                photoFileName: req.file.filename
            }
        })
    } catch (err) {
        res.status(404)
        next('no such planet with id ' + planetID)
    }

    const photo = req.file.filename
    res.status(201).json({ message: `photo added: ${photo}` })
});

/* Delete planet(s) */
router.delete("/:id(\\d+)", checkAuthorization, async (req, res, next) => {
    const planetID = Number(req.params.id)
    try {
        await prisma.planet.delete({ where: { id: planetID } });
        res.status(204).end();
    } catch (err) {
        res.status(404);
        next(`Cannot DELETE /planets/${planetID}. Element does not exist`);
    }
});

export default router;
