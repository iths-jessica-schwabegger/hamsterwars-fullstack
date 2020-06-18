require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
app.use(express.json());

app.use(express.static(__dirname + "/../build"));

//----------------------------Rate Limit----------------------------------
const rateLimit = require("express-rate-limit");
 
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);
 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
 
//  apply to all requests
app.use(limiter);

//--------------------------------------------------------------

//---------------Auth middleware------------------
app.use((req, res, next) => {

    if(req.method !== "GET") {

        //API-nyckel sparad i .env-filen
        const APIKey = process.env.API_KEY;

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


app.get('*', (req,res) => {
    let filePath = path.resolve('./build/index.html')
    res.sendFile(filePath)
})

// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname+"/..build/index-html"));
// });

app.listen(port, () => {
    console.log("Server is up and running on port " + port);
    
})
