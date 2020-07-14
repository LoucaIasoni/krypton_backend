var db = require('../db');

var Users = {
    getUsers: function(callback) { return db.query('SELECT * FROM users', callback); },
    getUser: function (id, callback) { return db.query('SELECT * FROM users where id = ?', id, callback); },
    deleteUser: function (id, callback) { return db.query('DELETE FROM users where id = ?', id, callback); },
}

module.exports = Users;