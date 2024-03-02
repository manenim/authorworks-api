import swaggerJsdoc from "swagger-jsdoc";
import { Express, Request, Response } from "express";
import swaggerUi from 'swagger-ui-express'


const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Books-API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts"], // files containing annotations as above
};

// const swaggerSpec = swaggerJsdoc(options);

let swaggerSpec: any; // Initialize as any to avoid type errors during error handling

try {
  swaggerSpec = swaggerJsdoc(options);
} catch (error) {
  console.error("Error generating Swagger spec:", error);
  // Handle the error here (e.g., log to a file, send an error response)
}


 function swaggerDocs(app: Express, port: number) {
   app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

   // Docs in JSON Format
   app.get("docs.json", (req: Request, res: Response) => {
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


export default swaggerDocs