const mongoose = require('mongoose');

const journalSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

const Journal = mongoose.model('journal', journalSchema);
module.exports = Journal;
