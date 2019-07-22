const { ApolloServer, makeExecutableSchema } = require('apollo-server-lambda');
import { SetBO } from './bo/setBO';
import { SetType } from './graphql/types/setType';
import { SetQuery } from './graphql/queries/setQuery';
import { BaseQuery } from './graphql/queries/baseQuery';

const setBO = new SetBO();

const resolvers = [{
  Query: {
    Set: setBO.getSets
  }
}];

const typeDefs = [
  BaseQuery,
  SetQuery,
  SetType
];

const schema = makeExecutableSchema(
  {
    typeDefs,
    resolvers
  }
);

const server = new ApolloServer({
	schema,
	context: async ({event, context}) => ({
		...context,
		headers: event.headers,
		functionName: context.functionName,
		event
	}),
	formatResponse: response => {
		console.log('response->', response);
		return response;
	},
	formatError: error => {
		console.log(JSON.stringify(error));
		delete error.extensions;
		return error;
	},
	tracing: true,
	playground: true
});
export function graphqlHandler(event, context, callback) {
	const handler =  server.createHandler({
		cors: {
			origin: '*',
			credentials: false,
			methods: [
				'POST',
				'GET'
			]
		}
	});

	return handler(event, context, callback);
};
// Construct a schema, using GraphQL schema language
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;
// Provide resolver functions for your schema fields
// const resolvers = {
//   Query: {
//     hello: () => 'Hello world!',
//   },
// };

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
// const server = new ApolloServer({ typeDefs, resolvers });

// export function graphqlHandler(event, context, callback) {
//   return server.createHandler({
//     cors: {
//       origin: '*'
//     }
//   });
// };
