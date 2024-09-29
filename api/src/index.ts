import express, { Application } from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { ApolloServer } from "apollo-server-express";
import { writeFileSync } from "fs";
import { printSchema } from "graphql";
import expressPlayground from "graphql-playground-middleware-express";
import dotenv from "dotenv";
import { connectDB } from "./db/db_connect";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4000;

const initializeServer = async () => {
  // Connect to the database
  await connectDB();

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  writeFileSync("/app/schema.graphql", printSchema(schema));

  // Create Apollo Server
  const server = new ApolloServer({schema});

  // Start the Apollo Server
  await server.start();
  server.applyMiddleware({ app });

  // Optionally write the schema to a file

  console.log(`Server is running on http://localhost:${port}/graphql`);
};


app.get("/", (req, res) => {
  res.send(`Welcome to the GraphQL API`);
});

// Set up GraphQL Playground
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));



// Start the server
app.listen(port, () => {
  initializeServer().catch((error) => {
    console.error("Error initializing server:", error);
  });
});
