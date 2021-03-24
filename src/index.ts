import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { dataSources } from "./datasource";

const server = new ApolloServer({ schema, dataSources });

server.listen().then(({ url }) => {
  console.log(`
  🚀  Server ready at ${url}
  🔉  Listening on port 4000
  📭  Query at https://studio.apollographql.com/dev
  `);
});
