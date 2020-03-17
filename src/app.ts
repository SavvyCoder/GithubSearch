import express from "express";
import compression from "compression"; // compresses requests
import path from "path";
import bodyParser from "body-parser";

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as api from "./controllers/api";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve public dir (CSS/JS)
app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/", homeController.index);
app.get("/api/", api.getRepos);

export default app;
