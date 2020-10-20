import express from "express";
import {showDashBoard} from "../controllers/adminController";
const adminRouter = express.Router();

/* GET */
adminRouter.get("/", showDashBoard);

export default adminRouter;