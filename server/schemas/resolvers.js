const { Profile, Question, Post } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    question: async () => {
      return Question.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },

    getPosts: async () => {
      try {
        const posts = await Post.find().populate('profile')
        if (!posts) return {error: 'no posts'}
        return posts
      }
      catch (err) {
        console.error(err)
        console.log('error finding posts')
      }
    },

    getProfileUsername: async (parent, { username }) => {
      return await Profile.findOne({ username });
    }
  },

  Mutation: {
    addProfile: async (parent, { username, email, password }) => {
      const profile = await Profile.create({ username, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });
      console.log("test", profile);

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      console.log("test1", token);
      return { token, profile };
    },
    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },
    addPost: async (parent, {comment, profileId}) => {
      const user = await Profile.findById(profileId);
      if (!profileId) {
        throw new Error('User not found!')
      };

      const post = await Post.create({ comment, profile: user._id });
      return await Post.findById(post._id).populate('profile');
    }
  },
};

module.exports = resolvers;
