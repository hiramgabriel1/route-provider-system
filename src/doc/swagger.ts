import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: {
      title: "routes system api",
      description: "a api documentation",
      version: "1.0.0",
    },
    host: "localhost:3000",
    basePath: "/testing",
  },
  apis: [`${path.join(__dirname, "../routes/*")}`],
};

const specs = swaggerJSDoc(options);

export default specs;
