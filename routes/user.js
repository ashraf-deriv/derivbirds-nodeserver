const router = require("express").Router();
const User = require("../app/model/User");
const { registerValidation } = require("../validation");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/:userId", async (req, res) => {
  //res.send("hiiii");
  try {
    const user = await User.findById(req.params.userId);
    console.log(user);
    let c = res.json(user);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.delete("/:userId", async (req, res) => {
  //res.send("hiiii");
  try {
    const user = await User.remove({ _id: req.params.userId });
    res.json(user);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.patch("/:userId", async (req, res) => {
  //res.send("hiiii");
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      { $set: { name: req.body.name } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //if the user already there
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("User already exist");

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ Message: err });
  }
});
module.exports = router;
