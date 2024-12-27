const typeDefs = `
type State {
  fsq_id: String!
  name: String!
}

type Query {
  states: [State!]!
}
`;
export default typeDefs;
