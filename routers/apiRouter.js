import express from "express";
import {test} from "../controllers/apiController";
const apiRouter = express.Router();

apiRouter.get("/", test);

export default apiRouter;
