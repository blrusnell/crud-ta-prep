const express = require('express');
const db = require('../database/index.js');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static('dist'));

app.post('/chats', (req, res) => {
   let body = req.body;
   db.savedInput(body, (err, data) => {
       if (err) {
        console.log(err);
        res.end();
       }
       db.getMessages((err, info) => {
           if (err) {
               console.log(err);
               res.end();
           }
           res.send(info);
       })
   })
});

app.get('/chats', (req, res) => {
    db.getMessages((err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        res.send(data);
    });
});

app.delete('/chats', (req, res) => {
    const message = req.body.id;
    console.log(message);
    db.deleteMessage(message, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        db.getMessages((err, info) => {
            if (err) {
                console.log(err);
                res.end();
            }
            res.send(info);
        });
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
