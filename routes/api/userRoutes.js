const router = require('express').Router();
const { User } = require('../../models');

// GET request for all users
router.get('/', async (req, res) => {
    try {
        const result = await User.find({});
        res.status(200).json(result);
    } catch (err) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// GET request for single user by id
router.get('/:id', async (req, res) => {
    try {
        const result = await User.findOne({ _id: req.params.id })
            // Joins the thoughts and friends tables
            .populate({ path: 'thoughts', select: '-__v', })
            .populate({ path: 'friends', select: '-__v', })
        // .save()
        // .execPopulate()
        // .populate({path: 'thoughts'})
        // this.populate({
        //     path: "friends",
        //     select: "-__v",
        // })
        // .select('-__v')
        // .populate('thoughts')
        res.status(200).json(result);
    } catch (err) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// POST request to post a user
router.post('/', async (req, res) => {
    const result = await User.create(req.body);
    // const result = new User({
    // username: req.body.username,
    // email: req.body.email,
    // thoughts: req.body.thoughts,
    // friends: req.body.friends
    // });
    result.save();
    if (result) {
        res.status(201).json(result);
    } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
    }
});


/*{
    "username": "lernantino",
    "email": "lernantino@gmail.com"
}*/

// PUT request to edit a user
router.put('/:id', async (req, res) => {
    try {
        const result = await User.findOneAndUpdate({ _id: req.params.id }, {
            username: req.body.username,
            email: req.body.email,
        },
            { new: true })
        res.status(200).json(result);
        console.log(`Updated to ${result}`)
    } catch (err) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// DELETE request to delete a user
router.delete('/:id', async (req, res) => {
    try {
        const result = await User.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
    } catch (err) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
    }
});

// POST request for users friends
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const result = await User.findOneAndUpdate(
            { _id: req.params.userId }, //where
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        res.status(200).json(result);
    } catch (err) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
    }
})

// DELETE request for users friends
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const result = await User.findOneAndUpdate(
            { _id: req.params.userId }, //where
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        res.status(200).json(result);
    } catch (err) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
    }
})



// Router export
module.exports = router;