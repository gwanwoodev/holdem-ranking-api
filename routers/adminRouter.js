import express from "express";
import {showDashBoard, showAdsBoard} from "../controllers/adminController";
const adminRouter = express.Router();

/* GET */
adminRouter.get("/", showDashBoard);
adminRouter.get("/ads", showAdsBoard);

export default adminRouter;