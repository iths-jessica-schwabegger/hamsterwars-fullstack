require('dotenv').config();
const express = require("express");
const app = express();
app.use(express.json());

app.use(express.static(__dirname + "/../build"));

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
app.use("/assets", express.static("assets/hamsters"));
app.use("/assets/upload", express.static("assets"));


const hamstersRoute = require("./routes/hamsters");
app.use("/hamsters", hamstersRoute);
const chartsRoute = require("./routes/charts");
app.use("/charts", chartsRoute);
const gamesRoute = require("./routes/games");
app.use("/games", gamesRoute);
const statsRoute = require("./routes/stats");
app.use("/stats", statsRoute);
const imagesRoute = require("./routes/images");
app.use("/images", imagesRoute);
//-----------------------------------------

const port = process.env.PORT || 2048;


app.listen(port, () => {
    console.log("Server is up and running on port " + port);
    
})
