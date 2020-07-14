var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Users = require('./Users');


router.get('/:id', function (req, res) {
    Users.getUser(req.params.id, function (err, rows) {
        if (err) { res.status(400).json(err); }
        else { res.json(...rows); }
    });
});

router.get('/', function (req, res) {
    Users.getUsers(function(err,rows){
        if(err)
        { res.status(400).json(err); }
        else
        { res.json(rows); }
    });
});

router.delete('/:id', function (req, res) {
    Users.deleteUser(req.params.id, function (err, rows) {
        if (err) { res.status(400).json(err); }
        else { res.json(...rows); }
    });
});

router.post('/new', function (req, res) {
    Users.addUser(req.body, function (err, rows) {
        if (err) { res.status(400).json(err); }
        else { res.json(rows); }
    });
});

router.post('/edit', function (req, res) {
    Users.editUser(req.body, function (err, rows) {
        if (err) { res.status(400).json(err); }
        else { res.json(rows); }
    });
});

module.exports = router;