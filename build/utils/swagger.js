"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Books-API",
            version: "1.0.0",
        },
    },
    apis: ["./routes/*.ts"], // files containing annotations as above
};
// const swaggerSpec = swaggerJsdoc(options);
let swaggerSpec; // Initialize as any to avoid type errors during error handling
try {
    swaggerSpec = (0, swagger_jsdoc_1.default)(options);
}
catch (error) {
    console.error("Error generating Swagger spec:", error);
    // Handle the error here (e.g., log to a file, send an error response)
}
function swaggerDocs(app, port) {
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    // Docs in JSON Format
    app.get("docs.json", (req, res) => {
        if (!swaggerSpec) {
            // Handle the case where swaggerSpec is not available (e.g., generation failed)
            return res
                .status(500)
                .send({ message: "Error: Swagger documentation unavailable" });
        }
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}
exports.default = swaggerDocs;
