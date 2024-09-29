"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./graphql/index");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_connect_1 = require("./database/db_connect");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = new apollo_server_express_1.ApolloServer({ typeDefs: index_1.typeDefs, resolvers: index_1.resolvers });
const port = process.env.PORT || 4000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield server.start();
    yield (0, db_connect_1.connectDB)();
    server.applyMiddleware({ app });
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}/playground`);
        console.log("Server is running on http://localhost:4000/graphql");
    });
}))();
app.get("/playground", (0, graphql_playground_middleware_express_1.default)({ endpoint: "/graphql" }));
// async function startServer() {
//   const schema = await buildSchema({
//     resolvers: [UserResolver],
//   });
//   // Generate schema file
//   writeFileSync("./schema.graphql", printSchema(schema));
//   const server = new ApolloServer({
//     schema,
//     introspection: true, // Enable GraphQL Playground
//   });
//   const app: Application = express();
//   await server.start();
//   server.applyMiddleware({ app });
//   // server.applyMiddleware(expressPlayground());
//   app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}/playground`);
//     console.log("Server is running on http://localhost:4000/graphql");
//   });
// }
// startServer().catch((e) => console.error(e));
//# sourceMappingURL=index.js.map