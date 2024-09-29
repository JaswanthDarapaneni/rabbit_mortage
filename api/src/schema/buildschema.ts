import { buildSchema } from "type-graphql";
import { UserResolver } from "../resolvers/UserResolver";


export const buildSchemaGQL = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  return schema
};
