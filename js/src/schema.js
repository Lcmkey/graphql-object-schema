const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} = require("graphql");

const PersonType = new GraphQLObjectType({
  name: "Person",
  description: "...",

  fields: () => ({
    firstName: {
      type: GraphQLString,
      resolve: (person) => person.first_name,
    },
    lastName: {
      type: GraphQLString,
      resolve: (person) => person.last_name,
    },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    id: { type: GraphQLString },
    friends: {
      type: new GraphQLList(PersonType),
      resolve: async (person, args, { loaders }) => {
        const keys = person.friends.map((f) => `/people/${f}`);
        const result = await loaders.person.loadMany(keys);

        return result;
      },
    },
  }),
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "...",

  fields: () => ({
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (root, args) => {
        const result = await loaders.person.load(`/people/${args.id}`);

        return result;
      },
    },
    persons: {
      type: new GraphQLList(PersonType),
      resolve: async (root, args, { loaders }, info) => {
        const result = await loaders.person.load(`/people`);

        return result;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: QueryType,
});

module.exports = schema;
