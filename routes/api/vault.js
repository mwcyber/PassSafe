const User = require("../../models/user");
const express = require("express");
const router = express.Router();

router.post("/getVault", async (req, res) => {
    try {
        const user = await User.findOne({ authToken: req.body.authToken });
        if (!user) return res.status(403).send("Access denied!");
        res.status(200).send({ vault: user.vault });
    } catch (err) {
        res.status(500).send("An error occured, " + err);
    }
});

router.post("/postVault", async (req, res) => {
    try {
        const user = await User.findOne({ authToken: req.body.authToken });
        if (!user) return res.status(403).send("Access denied!");
        user.vault = req.body.vault;
        user.save();
        res.status(200).send('Updated vault!');
    } catch (err) {
        res.status(500).send("An error occured, " + err);
    }
});

module.exports = router;