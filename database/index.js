const mysql = require ('mysql');

const con = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Chat'
})

con.connect( (err) => {
    if (err) throw err;
    console.log('connect');
    
});

const savedInput = (text, callback) => {
    const queryString = `INSERT INTO Chats (Username, Text) VALUES ('${text.username}', '${text.text}');`
    con.query(queryString, (err, poop) => {
        if (err) throw err;
        callback(null, poop);
    });
};

const getMessages = (callback) => {
    const queryString = 'SELECT * FROM Chats;'
    con.query(queryString, (err, data) => {
        if (err) throw err;
        callback(null, data);
    });
}

const deleteMessage = (id, callback) => {
    const queryString = `DELETE FROM Chats where ID=${id};`
    con.query(queryString, (err, data) => {
        if (err) {
            console.log(err);
        }
        callback(null, data);
    });
}


module.exports = {savedInput, getMessages, deleteMessage};