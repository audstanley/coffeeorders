const { backedUpFiles } = require('./fresh');
const db = require('diskdb');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/coffeeorders', (req, res) => {
    db.connect('./data', ['coffeeorders']);
    res.json(db.coffeeorders.find());
});

app.post('/coffeeorders', (req, res) => {
    db.connect('./data', ['coffeeorders']);
    try {
        db.coffeeorders.save(req.body);
        res.sendStatus(201);
    } catch (e) {
        console.log(`API error: ${e}`);
        res.sendStatus(500);
    }
});

app.delete('/coffeeorders', (req, res) => {
    db.connect('./data', ['coffeeorders']);
    backedUpFiles()
        .then(() => {
            res.sendStatus(200);
        });
});

// email routes.
app.get('/coffeeorders/:email', (req, res) => {
    const email = req.params.email;
    console.log(`looking for: ${email}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.find( { email: email } );
    if (record) res.status(200).json(record);
    else res.statusCode(404);
});

app.put('/coffeeorders/:email', (req, res) => {
    const email = req.params.email;
    console.log(`looking for: ${email}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.findOne( { email: email } );
    console.log(`PUT: ${JSON.stringify(record,null,2)}`);
    if (record) {
        try {
            req.body._id = record._id;
            db.coffeeorders.remove({ _id: record._id });
            setTimeout(() => {
                db.coffeeorders.save(req.body);
                res.status(200).json(req.body);
            }, 200);
        } catch (e) {
            res.status(500).json({"error": `${e}`});
        }
    }
    else res.status(404);
});

app.delete('/coffeeorders/:email', (req, res) => {
    const email = req.params.email;
    console.log(`looking for: ${email}`);
    db.connect('./data', ['coffeeorders']);
    let record = db.coffeeorders.findOne( { email: email } );
    if (record) {
        db.coffeeorders.remove( { _id: record._id }, false );
        res.status(200);
    }
    else res.status(404);
});
 
app.listen(3000);