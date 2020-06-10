require('dotenv').config();
const express = require("express");
const app = express();
app.use(express.json());

//---------------Auth middleware------------------
app.use((req, res, next) => {

    if(req.method !== "GET") {

        //API-nyckel sparad i .env-filen
        const APIKey = process.env.KEY;

        //jämför API-nyckel med nyckeln under auth i headers vid post/put
        if(APIKey === req.headers["authorization"]) {
            next();
        }
        else {
            res.send({Error: "You need a secret key to do that!"})
        }

    }else {
        next();
    }
})

//----------------ROUTES-----------------
app.use("/", express.static("public"));
app.use("/api/assets", express.static("assets/hamsters"));
app.use("/api/assets/upload", express.static("assets"));


const hamstersRoute = require("./routes/hamsters");
app.use("/api/hamsters", hamstersRoute);
const chartsRoute = require("./routes/charts");
app.use("api/charts", chartsRoute);
const gamesRoute = require("./routes/games");
app.use("api/games", gamesRoute);
const statsRoute = require("./routes/stats");
app.use("api/stats", statsRoute);

//-----------------------------------------

const port = process.env.PORT || 2048;
app.use(express.static(__dirname + "/../build"));

app.listen(port, () => {
    console.log("Server is up and running!");
    
})
