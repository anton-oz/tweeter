const typeDefs = `
  type Profile {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }
    
  type Question{
    _id: ID
    question: String
  }

  type Query {
    profiles: [Profile]!
    question: [Question]
    profile(profileId: ID!): Profile
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    
    removeProfile(profileId: ID!): Profile
  }
`;

module.exports = typeDefs;
