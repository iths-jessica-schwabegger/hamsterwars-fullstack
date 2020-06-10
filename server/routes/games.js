const { Router } = require("express");
const router = new Router();
const { db } = require("./../firebase");

//Hämtar alla games.
router.get("/", async (req, res) => {
    try {
        let games = [];
        let snapShot = await db.collection("games").get();

        snapShot.forEach(doc => {
            games.push(doc.data());
        })
        res.send({ games: games });
    }
    catch(err) {
        res.send(500).send(err);
    }

})

//Sparar ett game
router.post("/", async (req, res) => {
    try {
        let gamesDoc = await db.collection("games").doc();

        await gamesDoc.set({
            id: gamesDoc.id,
            timeStamp: Date(),
            contestants: req.body.contestants,
            winner: req.body.winner
        })
        res.send({ msg: "New game created!"});
    }
    catch(err) {
        console.error(err)
        res.send(500).send(err);
    }

})

module.exports = router;