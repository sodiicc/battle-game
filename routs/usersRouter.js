const router = require("express").Router();
let User = require("../models/user");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/createuser").post((req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  const newUser = new User({ name, password });
  User.find({name})
  .then(resp => {
    if(resp.length === 0) {
      newUser.save()
        .then(() => res.json({name}))
        .catch(err => res.status(400).json("ErrorCREATE: " + err))   
       }else{
         return res.json('take another name')
       }
  })
});

router.route("/login").post((req, res) => {
  User.find({ name: req.body.name, password: req.body.password })
    .then((resp) => {
      if(resp.length === 0) {
        return res.json('write correct login and password')
      }else {
       return res.json(resp[0])
      }
    } )
    .catch(err => res.status(400).json("ErrorLOGIN: " + err))
});

router.route("/update").post((req, res) => {
  const name = req.body.name;
  const type = req.body.type;

  User.update({ name, type })
    .then((response) => res.json(response))
    .catch(err => res.status(400).json("ErrorLOGIN: " + err))
});

module.exports = router