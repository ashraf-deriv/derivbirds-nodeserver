const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');

router.get('/', async (req, res) => {
    //const { error } = registerValidation(req.body);
    //if (error) return res.status(400).send(error.details[0].message);
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(400).send(err);
    }
});
router.post('/register', async (req, res) => {
    //Lest validate the data before submit
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;