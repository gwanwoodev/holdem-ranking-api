import express from "express";
import {showLogin} from "../controllers/adminController";
const startRouter = express.Router();

/* GET */
startRouter.get("/", showLogin);

export default startRouter;