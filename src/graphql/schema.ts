import { resolvers } from "@generated/type-graphql"; 
import { buildSchema } from "type-graphql";

async function createSchema() {
  const schema = await buildSchema({
    resolvers,
    validate: false,
  });
  return schema;
}

async function initializeSchema() {
  const schema = await createSchema();
  return schema;
}

initializeSchema();