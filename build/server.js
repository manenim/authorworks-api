"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import http from 'http';
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Author_1 = __importDefault(require("./routes/Author"));
const Book_1 = __importDefault(require("./routes/Book"));
const swagger_1 = __importDefault(require("./utils/swagger"));
// import Logging from './library/Logging';
mongoose_1.default.set("strictQuery", false);
const router = (0, express_1.default)();
// router.use(cors);
//connect to mongoose
mongoose_1.default
    .connect(config_1.config.mongo.url)
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
    const PORT = config_1.config.server.port;
    router.use((req, res, next) => {
        console.log(`incoming [${req.method}] url -- [${req.url}]  IP -- [${req.socket.remoteAddress}]`);
        res.on("finish", () => {
            console.log(`incoming [${req.method}] url -- [${req.url}]  IP -- [${req.socket.remoteAddress}] status -- [${res.statusCode}`);
        });
        next();
    });
    router.use((0, cors_1.default)());
    router.use(express_1.default.json());
    router.use(express_1.default.urlencoded({ extended: true }));
    /* Routes */
    router.use("/authors", Author_1.default);
    router.use("/books", Book_1.default);
    /* healthcheck */
    router.get("/ping", (req, res) => {
        res.status(200).json({ message: "pong" });
    });
    router.get("/", (req, res) => {
        res.status(200).send("hello world");
    });
    (0, swagger_1.default)(router, config_1.config.server.port);
    /* error handling or 404 route */
    router.use((req, res, next) => {
        // const error = new Error('not found');
        console.log("error");
        return res.sendStatus(404).json({ message: "404 not found" });
    });
    router.listen(PORT, () => console.log(`server listening on http://localhost:${PORT}`));
};
