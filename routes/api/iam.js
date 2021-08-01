const User = require("../../models/user");
const express = require("express");
const router = express.Router();

//User login
router.post("/login", async (req, res) => {
    try {

        /*         const user = new User({
                    email: 'ciao@gmail.com',
                    authToken: '685003f4d8afd10c7b9a4ffc481fc8ea0a9bb49eb20aa67a5049b7ffaaf9ad1a',
                    vault: '[{ciao: }, {}, {}]'
                });
        
                user.save(); */

        const loginData = await User.findOne({ authToken: req.body.authToken });

        if (!loginData) return res.status(403).send("Access denied!");

        res.send(loginData.vault);

    } catch (err) {
        res.send("An error occured");
    }
})

module.exports = router;