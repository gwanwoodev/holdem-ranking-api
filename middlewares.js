export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "상생몰";
    next();
}