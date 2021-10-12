const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware');
const Journal = require('../schema/journalSchema');

router.post('/feed/post', authMiddleware, async (req, res) => {
  const { journal } = req.body;
  const _id = req.user._id;

  try {
    const publicJournal = new Journal({
      publisherId: _id,
      _id: journal._id,
      title: journal.title,
      description: journal.description,
      theme: journal.theme,
      feeling: journal.feeling,
      interpretation: journal.interpretation,
    });
    publicJournal.save();
    res.send('jounral added to public');
  } catch (err) {
    console.log(err);
  }
});

router.delete('/feed/delete/:id', async (req, res) => {
  const id = req.params.id;
  await Journal.findByIdAndDelete(id);
  res.json('Journal Deleted from Public Feed');
});

router.get('/feed/', async (req, res) => {
  const journals = await Journal.find();
  res.send(journals);
});

router.put('/feed/journal/update', async (req, res) => {
  const { editPost } = req.body;
  const journal = await Journal.findById(editPost._id).lean();
  const newJournal = {
    ...journal,
    title: editPost.title,
    description: editPost.description,
    theme: editPost.theme,
    feeling: editPost.feeling,
    interpretation: editPost.interpretation,
  };
  console.log(newJournal);
  await Journal.updateOne({ _id: editPost._id }, newJournal);
  res.send('Updated Journal');
});

module.exports = router;
