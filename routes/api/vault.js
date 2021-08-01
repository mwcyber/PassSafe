const User = require("../../models/user");
const express = require("express");
const router = express.Router();

router.get("/getVault", async (req, res) => {
    try {
        const user = await User.findOne(req.body.authToken);

        if (!user) return res.status(403).send("Access denied!");

        res.send({ vault: user.vault });
    } catch (err) {
        res.send("An error occured, " + err);
    }
});

router.post("/postVault", async (req, res) => {
    try {
        const user = await User.findOne({ authToken: req.body.authToken });

        if (!user) return res.status(403).send("Access denied!");

        user.vault = req.body.vault;

        user.save();

        res.send('Updated vault!');
    } catch (err) {
        res.send("An error occured, " + err);
    }
});

module.exports = router;