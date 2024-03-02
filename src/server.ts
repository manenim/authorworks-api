import express from "express";
// import http from 'http';
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./config/config";
import authorRoutes from "./routes/Author";
import bookRoutes from "./routes/Book";
import swaggerDocs from "./utils/swagger";
// import Logging from './library/Logging';
mongoose.set("strictQuery", false);

const router = express();
// router.use(cors);
//connect to mongoose

mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log("connected");
    startServer();
  })
  .catch((error) => {
    console.error("unable to connect");
    console.error(error);
  });

/* only start server if mongo connects */

const startServer = () => {
  const PORT = config.server.port;
  router.use((req, res, next) => {
    console.log(
      `incoming [${req.method}] url -- [${req.url}]  IP -- [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      console.log(
        `incoming [${req.method}] url -- [${req.url}]  IP -- [${req.socket.remoteAddress}] status -- [${res.statusCode}`
      );
    });

    next();
  });
  router.use(cors());
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));

  /* Routes */

  router.use("/authors", authorRoutes);
  router.use("/books", bookRoutes);

  /* healthcheck */
  router.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
  });
  router.get("/", (req, res) => {
    res.status(200).send("hello world");
  });

  swaggerDocs(router, config.server.port);

  /* error handling or 404 route */

  router.use((req, res, next) => {
    // const error = new Error('not found');
    console.log("error");

    return res.sendStatus(404).json({ message: "404 not found" });
  });

  router.listen(PORT, () =>
    console.log(`server listening on http://localhost:${PORT}`)
  );
};
