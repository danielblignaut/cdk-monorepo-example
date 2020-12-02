/* eslint-disable no-var */
/* eslint-disable class-methods-use-this */
// /* eslint-disable class-methods-use-this */
// /* eslint-disable import/prefer-default-export */

import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import { Resolver, Query, buildSchemaSync } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      schema: GraphQLSchema;
    }
  }
}

// declare var schema: GraphQLSchema
@Resolver()
class HelloResolver {
  private recipesCollection: string[] = [];

  @Query((returns) => String)
  async hello() {
    console.log('Running hello resolver');
    return 'Hello World';
  }
}

global.schema =
  global.schema ||
  buildSchemaSync({
    resolvers: [HelloResolver],
  });

const schema = global.schema as GraphQLSchema;

const server = new ApolloServer({ schema, introspection: true, playground: true });

exports.handler = server.createHandler();
