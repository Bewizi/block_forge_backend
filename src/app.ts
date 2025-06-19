import express from "express";
import appConfig from "./shared/config";
import database from "./shared/config/database_config";
import cors from "cors";
import dotenv from "dotenv";
import rootRoutes from "./rootRoutes";
import * as path from "node:path";

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: process.env.ORIGIN_URL, // Allow all origins (for development only)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// API ROUTES
app.use("/api", rootRoutes);

app.listen(appConfig.app.port, appConfig.app.host, async () => {
  // await database.sync({force: true})
  await database.sync({ alter: true });
  console.log(
    `app listening on ${appConfig.app.port} on ${appConfig.app.host}`
  );
});
