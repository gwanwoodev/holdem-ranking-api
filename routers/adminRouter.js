import express from "express";
import {showDashBoard, showAdsBoard} from "../controllers/adminController";
import {authChecker} from "../middlewares";
const adminRouter = express.Router();

/* GET */
adminRouter.get("/", authChecker, showDashBoard);
adminRouter.get("/ads",authChecker, showAdsBoard);

export default adminRouter;