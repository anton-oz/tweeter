const db = require('../config/connection');
const { Profile, Question } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const questionSeeds = require('./questionSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Profile', 'profiles');
    await cleanDB('Question', 'questions');
    await Profile.create(profileSeeds);

    await Question.create(questionSeeds);


    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});