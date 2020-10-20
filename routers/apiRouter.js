import express from "express";
import path from "path";
import multer from "multer";
import {createUser, updateBanner, createAds, updateAds, deleteAds} from "../controllers/apiController";

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

/* POST */
apiRouter.post("/user", upload.single("profile"), createUser);
apiRouter.post("/links", upload.array("linkbanner", 5), updateBanner);
apiRouter.post("/ads/:location", upload.single("profile"), createAds);
apiRouter.put("/ads/:location?", upload.single("profile"), updateAds);
apiRouter.delete("/ads/:idx", deleteAds);

/* PUT */

/* DELETE */

export default apiRouter;
