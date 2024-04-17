const { Thought, User} = require('../../models');
const router = require('express').Router();

// GET request for all thoughts
router.get('/', async (req, res) => {
  try {
    const result = await Thought.find({});
    res.status(200).json(result);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET request for thought user by id
router.get('/:id', async (req, res) => {
  try {
    const result = await Thought.findOne({ _id: req.params.id })
    .populate({ path: 'reactions', select: '-__v', })
    res.status(200).json(result);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// POST request to post a thought
router.post('/', async (req, res) => {
  const result = await Thought.create(req.body);
  const user = await User.findOneAndUpdate(
    {_id: req.body.userId},
    {$addToSet: {thoughts: result._id}},
    {new: true}
  );
  if (result) {
    res.status(201).json(result);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});


/*
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
*/

// PUT request to edit a thought
router.put('/:id', async (req, res) => {
  try {
    const result = await Thought.findOneAndUpdate({ _id: req.params.id }, {
      thoughtText: req.body.thoughtText,
      username: req.body.username,
      reactions: req.body.reactions,
    },
      { new: true })
    res.status(200).json(result);
    console.log(`Updated to ${result}`)
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// DELETE request to delete a thought
router.delete('/:id', async (req, res) => {
  try {
    const result = await Thought.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(result);
    console.log(`Deleted: ${result}`);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// POST request for a thoughts reaction 
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
      const result = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId }, //where
          { $addToSet: { reactions: req.body }},
          { runValidators: true, new: true }
      )
      res.status(200).json(result);
  } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
  }
})



// DELETE request for a thoughts reaction 
module.exports = router;