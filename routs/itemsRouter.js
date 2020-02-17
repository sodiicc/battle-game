const router = require("express").Router();
let Item = require("../models/item");

router.route("/").get((req, res) => {
  Item.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newItem = new Item({ username });

  newItem.save()
    .then(() => res.json("Item added hi!")
    .catch(err => res.status(400).json("Error: " + err))
    );
});

module.exports = router