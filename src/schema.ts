import { gql, IResolvers, makeExecutableSchema } from "apollo-server";

const typeDefs = gql`
  "This is the Brewery type as described in the open brewery db documentation. Check out https://api.openbrewerydb.org/ for more information"
  type Brewery {
    id: Int
    name: String
    brewery_type: String
    street: String
    address_2: String
    address_3: String
    city: String
    county_province: String
    state: String
    postal_code: String
    country: String
    longitude: Float
    latitude: Float
    phone: String
    website_url: String
    updated_at: String
    created_at: String
  }

  type Query {
    withParams(
      name: String
      city: String
      type: String
      postal: String
    ): [Brewery]!
    breweryById(id: Int!): Brewery
  }

  type Mutation {
    sendEmail(
      name: String!
      address: String!
      email: String!
      phone: String!
      brewery_type: String!
      comment: String!
    ): String!
  }
`;

// NOTE: withQuery query replaces the below functions
// allBreweries: [Brewery]!
// breweryByName(name: String!): [Brewery]
// breweryByCity(city: String!): [Brewery]
// breweryByPostCode(postcode: String!): [Brewery]

const resolvers: IResolvers = {
  Query: {
    withParams(_, { name, city, type, postal }, { dataSources }) {
      return dataSources.breweryAPI.withParams(name, city, type, postal);
    },
    breweryById(_, { id }, { dataSources }) {
      return dataSources.breweryAPI.withId(id);
    },
  },
  Mutation: {
    sendEmail(
      _,
      { name, address, email, phone, brewery_type, comment },
      { dataSources }
    ) {
      return dataSources.breweryAPI.sendEmail(
        name,
        address,
        email,
        phone,
        brewery_type,
        comment
      );
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
