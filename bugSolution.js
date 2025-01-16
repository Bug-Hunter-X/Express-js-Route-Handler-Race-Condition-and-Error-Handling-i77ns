const express = require('express');
const app = express();
//Simulate database interaction with promises and potential errors
const db = {
  users: {
    '1': { id: '1', name: 'John Doe' },
    '2': { id: '2', name: 'Jane Doe' },
  },
  getUser: async function(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.users[id]) {
          resolve(this.users[id]);
        } else {
          reject('User not found');
        }
      }, 100); // Simulate database delay
    });
  }
};
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await db.getUser(userId);
    res.send(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(404).send('User not found');
  }
});

module.exports = app;