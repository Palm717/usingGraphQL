//mongoose models
import Project from "../models/Project.js";
import Client from "../models/Client.js";

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";

// Queries
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    //create a relationship to the client
    client: {
      type: ClientType,
      resolve(parent, args) {
        //return the child of the parent project id -- in this case return the client relationship to the project
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //return all projects in the database
    //projects are in a list
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        Project.find(); // return the projects array
      },
    },

    // return a single project from the database
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    //return all clients in the database
    //the clients are in a list
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find(); // return the array
      },
    },

    // return a single client from the database
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        //non null -- make sure field is not left empty
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLNonNull(GraphQLString) },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        // mongoose save a client to our DB
        return project.save();
      },
    },
    addClient: {
      type: ClientType,
      args: {
        //non null -- make sure field is not left empty
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        // mongoose save a client to our DB
        return client.save();
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
