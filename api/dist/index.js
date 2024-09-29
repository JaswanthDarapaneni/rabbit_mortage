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
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./resolvers/UserResolver");
const apollo_server_express_1 = require("apollo-server-express");
const fs_1 = require("fs");
const graphql_1 = require("graphql");
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_connect_1 = require("./db/db_connect");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const initializeServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // Connect to the database
    yield (0, db_connect_1.connectDB)();
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [UserResolver_1.UserResolver],
    });
    (0, fs_1.writeFileSync)("./schema.graphql", (0, graphql_1.printSchema)(schema));
    // Create Apollo Server
    const server = new apollo_server_express_1.ApolloServer({ schema });
    // Start the Apollo Server
    yield server.start();
    server.applyMiddleware({ app });
    // Optionally write the schema to a file
    console.log(`Server is running on http://localhost:${port}/graphql`);
});
app.get("/", (req, res) => {
    res.send(`Welcome to the GraphQL API`);
});
// Set up GraphQL Playground
app.get("/playground", (0, graphql_playground_middleware_express_1.default)({ endpoint: "/graphql" }));
// Start the server
app.listen(port, () => {
    initializeServer().catch((error) => {
        console.error("Error initializing server:", error);
    });
});
//# sourceMappingURL=index.js.map