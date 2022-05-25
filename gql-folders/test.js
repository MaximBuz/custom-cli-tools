export const typeDef = `
  type Query {
    getUserByID(id: Int!): User
    getUserByFirebaseId(id: String!): User
    getWavesByUserID(id: Int!): [WaveOptions]
    getWavesByFirebaseId(id: String!): [WaveOptions]
    getWaveById(id: Int!): WaveOptions
  }

  type Mutation {
    createNewUser(
      firebaseId: String
    ):  User
  
    createNewBubble(
      name: String!
      seed: Int!
    ): BubbleOptions
  
    createNewWaves(id: Int!): WaveOptions
    doSomethingElse: WaveOptions
    createNewCorners: CornerOptions
  }

  type Marker {
    id: Int!
    name: String!
    user: User
  }
  
  type User {
    id: Int!
    firebaseId: String!
    marker: Marker
  }
`;