const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const connection = require('./connection');

require('./mongoose');

const User = require('./User');

router.get('/', (req, res) => {
    res.send('NodeJS is working');
});

// GET USERS
router.get('/users', async (req, res) => {
    try {
        if (connection.isConnected()) {
            const db = connection.db('db_latihan');
            const users = await db.collection('users').find().toArray();

            res.send({data: users});
        } else {
            res.send('Error DB Connection');
        }
    } catch (err) {
        res.send({ message: err.message || 'internal server error' });
    }
});

// POST USERS
router.post('/users', async (req, res) => {
    try {
        if (connection.isConnected()) {
            const { name, age, status } = req.body;
            const db = connection.db('db_latihan');
            const users = await db.collection('users').insertOne({
                name, age, status
            });

            if (users.insertedCount === 1) {
                return res.send('Success Created User');
            } else {
                return res.send('Failed Create User');
            }
        } else {
            res.send('Error DB Connection');
        }
    } catch (err) {
        res.send({ message: err.message || 'internal server error' });
    }
});

// PUT USERS
router.put('/users/:id', async (req, res) => {
    try {
        if (connection.isConnected()) {
            const { id } = req.params;
            const { name, age, status } = req.body;
            const db = connection.db('db_latihan');
            const users = await db.collection('users').updateOne({_id: ObjectId(id)}, {
                $set: {
                    name,
                    age,
                    status
                }
            });

            if (users.modifiedCount === 1) {
                return res.send('Success Edited User');
            } else {
                return res.send('Failed Edit User');
            }

        } else {
            res.send('Error DB Connection');
        }
    } catch (err) {
        res.send({ message: err.message || 'internal server error' });
    }
});

// DELETE USERS
router.delete('/users/:id', async (req, res) => {
    try {
        if (connection.isConnected()) {
            const { id } = req.params;
            const db = connection.db('db_latihan');
            const users = await db.collection('users').deleteOne({_id: ObjectId(id)});

            if (users.deletedCount === 1) {
                res.send({message: "Success Deleted"});
            } else {
                res.send({message: 'Failed Delete User'});
            }
        } else {
            res.send('Error DB Connection');
        }
    } catch (err) {
        res.send({ message: err.message || 'internal server error' });
    }
});

// MONGOOSE TREATMENT
router.get('/users-get', async (req, res) => {
    try {
        const users = await User.find();

        res.send({data: users});
    } catch (err) {
        res.send({ message: err.message || 'internal server error' });
    }
});

module.exports = router;