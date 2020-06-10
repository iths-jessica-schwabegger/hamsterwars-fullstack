const { Router } = require("express");
const router = new Router();
const { db } = require("./../firebase");


//returnera array med top 5 hamsterz
router.get("/top", async (req, res) => {
    let topHamsters = [];
    try {
        let snapShot = await db.collection("hamsters").orderBy("wins", "desc").limit(5).get();

        snapShot.forEach(doc => {
            topHamsters.push(doc.data());
        })
        res.send({topHamsters: topHamsters});
    }
    catch(err) {
        res.status(500).send(err);
    }

})

//returnera array med bottom 5 hamsterz
router.get("/bottom", async (req, res) => {
    let bottomHamsters = [];
    try {
        let snapShot = await db.collection("hamsters").orderBy("defeats", "desc").limit(5).get();

        snapShot.forEach(doc => {
            bottomHamsters.push(doc.data());
        })
        res.send({bottomHamsters: bottomHamsters});
    }
    catch(err) {
        res.status(500).send(err);
    }

})

module.exports = router;