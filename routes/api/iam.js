const User = require("../../models/user");
const express = require("express");
const router = express.Router();

//User login
router.post("/login", async (req, res) => {
    try {
        const loginData = await User.findOne({ authToken: req.body.authToken });
        if (!loginData) return res.status(403).send("Access denied!");
        res.status(200).send('Logged In');
    } catch (err) {
        res.status(500).send("An error occured, " + err);
    }
})

//User signup
router.post("/signup", async (req, res) => {
    try {

        User.create({
            email: req.body.email,
            authToken: req.body.authToken,
            vault: req.body.vault
        });

        res.status(200).send('Account created!');

    } catch (err) {
        res.status(500).send("An error occured, " + err);
    }
})

module.exports = router;