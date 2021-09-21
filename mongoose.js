const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db_latihan', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    // const users = await User.findOne({_id: '6149ca5124c83d069c38a4a3'});

    // console.log(users);
});

