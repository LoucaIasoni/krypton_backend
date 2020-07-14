var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../config");
var User = require("../users/Users");
var VerifyToken = require("./VerifyToken");

router.post("/login", function (req, res) {
  User.findOne(req.body.email, function (err, user) {
    if (err) return res.status(500).send("Error on the server.");
  
   //console.log(user[0].password);
    if (!user) return res.status(404).send("No user found.");
    var passwordIsValid = bcrypt.compareSync(req.body.password, user[0].password);

    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user[0].id }, config.secret, {
      expiresIn: 86400,
    });

    const userInfo = {
      token,
      user
    }

    return res.status(200).send(userInfo);  // { auth: true, token: token }
  });
});

router.post("/register", function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  if (req.body.name === "jr") {
    User.insertuser(req.body, function (err, user) {
      if (err) return res.status(500).json(err);

      var token = jwt.sign({ id: user.insertId }, config.secret, {
        expiresIn: 86400,
      });
      res.status(200).send({ auth: true, token: token });
    });
  }
});

router.get("/logout", function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.get("/check", VerifyToken, function (req, res) {
  User.findbyID(req.body.id, { password: 0 }, function (err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    res.status(200).send(user);
  });
});

module.exports = router;
