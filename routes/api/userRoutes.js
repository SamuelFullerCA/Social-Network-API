const {User} = require('../../models');

app.get('/', async (req, res) => {
    try {
      const result = await User.find({});
      res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });


  app.get('/:id', async (req, res) => {
    try {
      const result = await User.findOne({_id: req.params.id});
      res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });


app.post('/', (req, res) => {
    const result =  User.create({
        username: req.body.username,
        email: req.body.email,
        thoughts: req.body.thoughts,
        friends: req.body.friends
    });
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

app.put('/:id', async (req, res) => {
    try {
      const result = await User.findOneAndUpdate({_id: req.params.id}, {
        username: req.body.username,
        email: req.body.email,
        thoughts: req.body.thoughts,
        friends: req.body.friends
    }, 
    {new: true})
      res.status(200).json(result);
      console.log(`Updated to ${result}`)
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });


  app.delete('/:id', async (req, res) => {
    try {
      const result = await User.findOneAndDelete({_id: req.params.id});
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });