const {Thought} = require('../../models');

app.get('/', async (req, res) => {
    try {
      const result = await Thought.find({});
      res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });


  app.get('/:id', async (req, res) => {
    try {
      const result = await Thought.findOne({_id: req.params.id});
      res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });


app.post('/', (req, res) => {
    const result =  Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
        reactions: req.body.reactions,
    });
    result.save();
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


app.put('/:id', async (req, res) => {
    try {
      const result = await Thought.findOneAndUpdate({_id: req.params.id}, {
        thoughtText: req.body.thoughtText,
        username: req.body.username,
        reactions: req.body.reactions,
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
      const result = await Thought.findOneAndDelete({_id: req.params.id});
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });