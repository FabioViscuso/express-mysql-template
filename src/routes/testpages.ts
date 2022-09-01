import { Router } from "express";

const router = Router();

router.get("/list", (req, res) => {
    res.sendFile('list.html', { 'root': `${__dirname}/../../web/` });
});

router.get("/add", (req, res) => {
    res.sendFile('add.html', { 'root': `${__dirname}/../../web/` });
});

router.get("/photoupload", (req, res) => {
    res.sendFile('photoupload.html', { 'root': `${__dirname}/../../web/` });
});

export default router;
