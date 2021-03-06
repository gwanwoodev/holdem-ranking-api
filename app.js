import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";
import methodOverride from "method-override";
import adminRouter from "./routers/adminRouter";
import startRouter from "./routers/startRouter";
import path from "path";

const app = express();

app.use(helmet());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(localsMiddleware);
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use("/", startRouter);
app.use("/api", apiRouter);
app.use("/dash", adminRouter);

export default app;

