const mongoose = require('mongoose');

const journalSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  theme: { type: String },
  feeling: { type: String },
  interpretation: { type: String },
  public: { type: Boolean, default: false },
  publishDate: { type: Date, default: Date.now },
  comments: [
    {
      publisherId: { type: String },
      comment: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Journal = mongoose.model('journal', journalSchema);
module.exports = Journal;
