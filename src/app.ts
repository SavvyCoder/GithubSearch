import express from "express";
import compression from "compression"; // compresses requests
import path from "path";

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

// Serve public dir (CSS/JS)
app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/", homeController.index);
app.get("/api/:repo", api.getRepos);

export default app;
