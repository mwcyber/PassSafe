require('dotenv').config();
const iam = require("./routes/api/iam");
const vault = require("./routes/api/vault");
const connection = require("./db");
const express = require('express');
const path = require('path');
const app = express();

connection();

app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use("/api/iam", iam);
app.use("/api/vault", vault);
app.route("/*")
    .get((req, res) => {
        res.sendFile(path.resolve(__dirname + "/public/index.html"));
    });

app.listen(process.env.PORT || 8080, () => console.log('Server started on port ' + process.env.PORT));