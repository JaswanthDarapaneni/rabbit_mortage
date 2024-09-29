"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type Sample {
    id: String!
    make: String!
    model: String!
    year: Int!
    color: String!
    mileage: Int!
    price: Float!
  }

  type Query {
    matches(sampleId: String!): [Sample!]! # sampleId is required, and it returns a list of Sample objects
  }
`;
//# sourceMappingURL=schema.js.map