const router = require("express").Router();
let Hero = require("../models/hero");

router.route("/").get((req, res) => {
  Hero.find()
    .then(heroes => res.json(heroes))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = Date.parse(req.body.date);

  const newHero = new Hero({ username, description, duration, date });

  newHero
    .save()
    .then(() =>
      res
        .json("Hero added!")
        .catch(err => res.status(400).json("Error: " + err))
    );
});

router.route("/:id").get((req, res) => {
  Hero.findById(req.params.id)
    .then(hero => res.json(hero))
    .catch(err => res.status(400).json("Errors: " + err));
});

router.route("/:id").delete((req, res) => {
  Hero.findByIdAndDelete(req.params.id)
    .then(() => res.json("Hero deleted !!!"))
    .catch(err => res.status(400).json("Errors: " + err));
});

router.route("/update/:id").post((req, res) => {
  Hero.findById(req.params.id)
    .then(hero => {
      hero.username = req.body.username;
      hero.description = req.body.description;
      hero.duration = Number(req.body.duration);
      hero.date = Date.parse(req.body.date);
      hero
        .save()
        .then(() => res.json("Hero updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
