import jwt from "jsonwebtoken";
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "상생몰";
    next();
}

export const authChecker = (req, res, next) => {
    const token = req.cookies.token;
    jwt.verify(token, "holdem_ranking_api_use#$*", (err) => {
        if(err) {
            res.status(401).json({error: 'Auth Error from AuthChecker', msg: "failed"});
        }else {
            next();
        }
    });
}