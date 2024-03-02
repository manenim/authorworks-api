"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.tvrif8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.cf34ntq.mongodb.net
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
exports.config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
// DATABASE_URI = mongodb+srv://mongoTuts:manex1234@cluster0.tzkmn.mongodb.net/companyDB?retryWrites=true&w=majority
