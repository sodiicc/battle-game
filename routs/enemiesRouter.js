const router = require("express").Router();
let Enemy = require("../models/enemy");

router.route("/").get((req, res) => {
  Enemy.find()
    .then(enemies => res.json(enemies))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const newEnemy = new Enemy(req.body);

  newEnemy
    .save()
    .then(() => res.json("Enemy added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Enemy.findById(req.params.id)
    .then(enemy => res.json(enemy))
    .catch(err => res.status(400).json("Errors: " + err));
});

router.route("/:id").delete((req, res) => {
  Enemy.findByIdAndDelete(req.params.id)
    .then(() => res.json("Enemy deleted !!!"))
    .catch(err => res.status(400).json("Errors: " + err));
});

router.route("/update/:id").post((req, res) => {
  Enemy.findById(req.params.id)
    .then(enemy => {
      enemy.username = req.body.username;
      enemy.description = req.body.description;
      enemy.duration = Number(req.body.duration);
      enemy.date = Date.parse(req.body.date);
      enemy
        .save()
        .then(() => res.json("Enemy updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
