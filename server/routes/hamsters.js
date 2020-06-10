const { Router } = require("express");
const router = new Router();
const { db } = require("./../firebase");

//Hämtar random hamster.
router.get("/random", async (req, res) => {
    try {
        let hamsters = [];
        let snapShot = await db.collection("hamsters").get();
        
        snapShot.forEach(doc => {
            hamsters.push(doc.data());
        })
        let random = Math.floor(Math.random() * hamsters.length)
        res.send(hamsters[random]);

    }
    catch(err) {
        res.status(500).send(err);
    }

});

//Hämtar alla hamsters i hela världen
router.get("/", async (req, res) => {
    try {
        let hamsters = [];
        let snapShot = await db.collection("hamsters").get();
        
        snapShot.forEach(doc => {
            hamsters.push(doc.data());
        })
        res.send({hamsters: hamsters})
    }
    catch(err) {
        res.status(500).send(err);
    }
});

//Hämtar hamster med specifikt ID
router.get("/:id", async (req, res) => {
    try {
        let hamster;
        let snapShot =  await db.collection("hamsters").where("id", "==", parseInt(req.params.id)).get();

        snapShot.forEach(doc => {
            hamster = doc.data();
        })
        res.send({hamster: hamster});
    }
    catch(err) {
        res.status(500).send(err);
    }
});


//Uppdaterar wins/defeats/games i databasen vid en PUT
router.put("/:id/results", async (req, res) => {
    try {
        //leta reda på hamster med ID :id
        let snapShot =  await db.collection("hamsters").where("id", "==", parseInt(req.params.id)).get();
        
        snapShot.forEach(doc => {
            let hamster = doc.data();
            
            //uppdatera wins/defeats/games på hamster
            if(parseInt(req.body.wins) > 0 ) {
                hamster.wins++;
            }
            if(parseInt(req.body.defeats) > 0 ) {
                hamster.defeats++;
            }
            hamster.games += 1;
            
            //skriv in den nya uppdaterade hamstern i db
            db.collection("hamsters").doc(doc.id).set(hamster)
            res.send({ msg: "hamster updated!"});
        })
    }
    catch(err) {
        res.status(500).send(err);
    }
});

router.post("/", async (req, res) => {
    try {
        let hamsters = [];
        let snapShot = await db.collection("hamsters").get();

        snapShot.forEach(doc => {
            hamsters.push(doc.data());
        })
        console.log(hamsters.length);
        db.collection("hamsters").doc().set({
            id: hamsters.length+1,
            name: req.body.name,
            age: req.body.age,
            favFood: req.body.favFood,
            loves: req.body.loves,
            imgName: `hamster-${hamsters.length+1}.jpg`, //uploaded img name bör döpas till samma
            wins: 0,
            defeats: 0,
            games: 0
        });

        res.send({ msg: "New hamster up for a fight!" });
    }
    catch(err) {
        res.status(500).send(err);
    }

})

module.exports = router;

