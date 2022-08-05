import { response, Router } from "express";
import { passport } from "../lib/middleware/passport";

const router = Router();

router.get("/login", (req, res, next) => {
    if (typeof req.query.redirectTo !== "string" || !req.query.redirectTo) {
        response.status(400);
        return next("Missing redirectTo query string param");
    }

    req.session.redirectTo = req.query.redirectTo;
    res.redirect("/auth/github/login")
})

router.get("/auth/github/login",
    passport.authenticate(
        "github",
        {
            scope: ["user:email"]
        }
    )
);

router.get("/github/callback",
    // @ts-ignore KNOWN ISSUE WITH PASSPORT
    passport.authenticate("github", { failureRedirect: "/auth/github/login", keepSessionInfo: true }),
    (req, res) => {
        if (typeof req.session.redirectTo !== "string") {
            return res.status(500).end()
        }

        res.redirect(req.session.redirectTo)
    }
)

router.get("/logout", (req, res, next) => {
    if (typeof req.query.redirectTo !== "string" || !req.query.redirectTo) {
        response.status(400);
        return next("Missing redirectTo query string param");
    }

    const redirectURL = req.query.redirectTo;

    req.logout((err) => {
        if (err) {
            return next(err)
        }

        res.redirect(redirectURL)
    })
})

export default router;
