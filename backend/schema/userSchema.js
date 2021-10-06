const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  journal: [
    {
      title: { type: String },
      description: { type: String },
      theme: { type: String },
      characters: { type: String },
      location: { type: String },
      feeling: { type: String },
      interpretation: { type: String },
      favorite: { type: Boolean },
      public: { type: Boolean },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model('user', userSchema);
module.exports = User;
