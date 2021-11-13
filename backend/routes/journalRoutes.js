const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware');
const Journal = require('../schema/journalSchema');
const User = require('../schema/userSchema');

router.post('/feed/post', authMiddleware, async (req, res) => {
  const { journal } = req.body;
  const _id = req.user._id;
  const user = await User.findById({ _id });
  console.log(user);
  try {
    const publicJournal = new Journal({
      publisherId: _id,
      publisherName: user.name,
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

router.get('/feed/journal/:id', async (req, res) => {
  const id = req.params.id;
  const journal = await Journal.findById(id);
  res.send(journal);
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
  await Journal.updateOne({ _id: editPost._id }, newJournal);
  res.send('Updated Journal');
});

router.put('/feed/journal/comment', authMiddleware, async (req, res) => {
  const { comment, id } = req.body;
  const _id = req.user._id;
  const user = await User.findById({ _id }).lean();
  const journal = await Journal.findOne({ _id: id }).lean();
  const newComment = [
    ...journal.comments,
    { publisherId: _id, publisherName: user.name, comment: comment },
  ];
  const newJournal = {
    ...journal,
    comments: newComment,
  };

  console.log(newJournal);
  await Journal.updateOne({ _id: id }, newJournal);
});

router.delete('/feed/comment/remove/:id/:jid', async (req, res) => {
  const id = req.params.id;
  const jid = req.params.jid;
  const journal = await Journal.findById({ _id: jid }).lean();
  const newJournal = journal.comments.filter((comment) => comment._id != id);

  const updatedJournal = {
    ...journal,
    comments: newJournal,
  };
  console.log(updatedJournal);
  await Journal.updateOne({ _id: jid }, updatedJournal);
  // res.json('Journal Deleted');
});

module.exports = router;
