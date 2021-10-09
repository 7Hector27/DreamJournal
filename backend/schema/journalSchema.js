const mongoose = require('mongoose');

const journalSchema = mongoose.Schema({
  publisherId: { type: String },
  journalId: { type: String },
  title: { type: String },
  description: { type: String },
  theme: { type: String },
  feeling: { type: String },
  interpretation: { type: String },
  comments: [
    {
      publisherId: { type: String },
      publisherName: { type: String },
      comment: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Journal = mongoose.model('journal', journalSchema);
module.exports = Journal;
