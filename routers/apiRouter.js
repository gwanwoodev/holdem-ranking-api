import express from "express";
import path from "path";
import multer from "multer";
import {
    testApi,
    createUser, 
    createAds, 
    updateAds,
    updateUser,
    deleteAds,
    searchUser,
    getUsers,
    getUser,
    getAds,
    getAd,
    updateBanner,
    getLinks,
    holdemInit,
    deleteUser,
    searchAds,
    getAdInfo,
    login,
} from "../controllers/apiController";

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public");
        },
        filename: (req, file, cb) => {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        },
    }),
});

const apiRouter = express.Router();

/* GET */
apiRouter.get("/search/:name", searchUser);
apiRouter.get("/users", getUsers);
apiRouter.get("/user/:idx", getUser);
apiRouter.get("/ads", getAds);
apiRouter.get("/ads/:location", getAd);
apiRouter.get("/links", getLinks);
apiRouter.get("/init", holdemInit);
apiRouter.get("/search/ads/:name", searchAds);
apiRouter.get("/test", testApi);
apiRouter.get("/ads/ad/:idx", getAdInfo);

/* POST */
apiRouter.post("/login", login);
apiRouter.post("/user", upload.single("profile"), createUser);
apiRouter.post("/links", upload.single("linkbanner"), updateBanner);
apiRouter.post("/ads/:location", upload.single("profile"), createAds);

/* PUT */
apiRouter.put("/user", upload.single("profile"), updateUser);
apiRouter.put("/ads/:location?", upload.single("profile"), updateAds);

/* DELETE */
apiRouter.delete("/user/:idx", deleteUser);
apiRouter.delete("/ads/:idx", deleteAds);

export default apiRouter;
