import { createTestClient } from "apollo-server-testing";
import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { dataSources } from "./datasource";

const BREWERY_BY_ID = `
query Query($id: Int!) {
  breweryById(id: $id) {
    id
    name
    brewery_type
    street
    city
    state
    postal_code
    phone
    website_url
  }
}`;

const WITH_PARAMS = `
query Query($name: String, $city: String, $type: String, $postal: String) {
  withParams(name: $name, city: $city, type: $type, postal: $postal) {
    id
    name
    brewery_type
    street
    city
    state
    postal_code
    country
    website_url
    phone
  }
}`;

const server = new ApolloServer({ schema, dataSources });
const { query } = createTestClient(server);

query({
  query: BREWERY_BY_ID,
  variables: { id: 1 },
});

query({
  query: WITH_PARAMS,
  variables: { name: 'aloha' }
});

it("fetching single brewery by name", async () => {
  const res = await query({ query: BREWERY_BY_ID, variables: { id: 1 } });
  expect(res).toMatchSnapshot();
});

it("fetching multiple breweries by name", async () => {
  const res = await query({ query: WITH_PARAMS, variables: { name: "beer" } });
  expect(res).toMatchSnapshot();
});

it("fetching multiple breweries by name and city", async () => {
  const res = await query({ query: WITH_PARAMS, variables: { name: "hellbent",  city:"seattle"} });
  expect(res).toMatchSnapshot();
});
