const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const Filter = require("bad-words");
const filter = new Filter();

const profileSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // 4-12 characters, upper and lowercase letters, numbers, periods, hyphens, and underscores
    match: [
      /^[a-zA-Z0-9.\-_]{4,12}$/,
      "Username must be between 4 and 12 characters and contain only letters, numbers, periods, hyphens, and underscores!",
    ],
    validate: {
      validator: function (v) {
        return !filter.isProfane(v);
      },
      message: "Username cannot contain profanity!",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  avatar: {
    type: String,
  },
});
// set up pre-save middleware to create password
profileSchema.pre("save", async function (next) {
  console.log("pre save middleware");
  if (this.isNew || this.isModified("password")) {
    console.log("modifying password");
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

profileSchema.pre("update", async function (next) {
  console.log("pre update middleware");
  if (this.isNew || this.isModified("password")) {
    console.log("modifying password");
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Profile = model("Profile", profileSchema);

module.exports = Profile;
