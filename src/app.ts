import express from "express";
import compression from "compression"; // compresses requests
import path from "path";
import bodyParser from "body-parser";
import * as secrets from "./util/secrets";

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as api from "./controllers/api";

// Create Express server
const app = express();

// Express configuration
app.set("port", secrets.PORT || 3001);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve public dir (CSS/JS)
app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

// Custom Middleware
app.use(function(req, res, next) {
  //Set CORS to all for testing
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/**
 * Primary app routes.
 */
app.get("/", homeController.index);
app.post("/api", api.getRepos);

export default app;
