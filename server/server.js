const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const nedb = require('nedb-promises')
const db = nedb.create('data.db');

const app = express();
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello from Node.js'
    });
});

app.get('/list', async (req, res) => {
    const messages = await db.find();
    res.json(messages);
});

app.post('/create', async (req, res) => {
    if (req.body.name
        && req.body.name.toString() !== ''
        && req.body.content
        && req.body.content.toString() !== '') {
        const inserted = await db.insert({
            name: req.body.name.toString(),
            content: req.body.content.toString()
        });
        res.json(inserted);
    } else {
        res.status(500);
        res.json({
            message: 'Name and content cannot be empty!'
        });
    }
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000!');
});
