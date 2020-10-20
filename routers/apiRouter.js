import express from "express";
import path from "path";
import multer from "multer";
import {
    createUser, 
    updateBanner, 
    createAds, 
    updateAds,
    updateUser,
    deleteAds,
    searchUser,
    getUsers,
    getUser,
    getAds,
    getAd
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

/* POST */
apiRouter.post("/user", upload.single("profile"), createUser);
apiRouter.post("/links", upload.array("linkbanner", 5), updateBanner);
apiRouter.post("/ads/:location", upload.single("profile"), createAds);

/* PUT */
apiRouter.put("/user/:idx", updateUser);
apiRouter.put("/ads/:location?", upload.single("profile"), updateAds);

/* DELETE */
apiRouter.delete("/ads/:idx", deleteAds);

export default apiRouter;
