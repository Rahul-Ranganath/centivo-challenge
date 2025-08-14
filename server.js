const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();

connectDB();

app.use(express.json());


app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  //Bonus: Gracefully handle invalid ObjectId errors
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid User ID format' });
  }

  try {
    //Match the document by its _id
    //Also ensure the user's age is greater than 21
    const query = {
      _id: id,
      age: { $gt: 21 }
    };

    const user = await User.findOne(query);

    //If no user is found (either ID doesn't exist or age <= 21), return 404
    if (!user) {
      return res.status(404).json({ message: 'User not found or age not over 21' });
    }

    //If a user is found, return their details
    res.status(200).json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));