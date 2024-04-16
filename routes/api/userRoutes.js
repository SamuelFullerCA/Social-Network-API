const {User} = require('../../models');

app.get('/', async (req, res) => {
    try {
      const result = await Department.find({});
      res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });


// GET SING USER BY _id


// POST NEW USER


/*{
    "username": "lernantino",
    "email": "lernantino@gmail.com"
}*/



// PUT UPDATE USER


// DELETE USER