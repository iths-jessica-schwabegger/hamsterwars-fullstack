const { Router } = require("express");
const { storage, db } = require("./../firebase");
const router = new Router();
const fileUpload = require("express-fileupload");
const fs = require("fs");


router.use(fileUpload());


router.get("/:imgName", async (req, res) => {

    let img = await storage.bucket().file(`hamsters/${req.params.imgName}`).download();
    img = Buffer.concat(img);
    res.contentType("jpg");
    res.status(200).send(img);
});

//const bucket = storage.bucket(process.env.BUCKET);
router.post("/", async (req, res) => {
    try{
        //hämtar hamstrar från db för att ge rätt id-nr på filnamnet senare.
        let hamsters = [];
        let snapShot = await db.collection("hamsters").get();

        snapShot.forEach(doc => {
            hamsters.push(doc.data());
        })


        //bilderna läggs i mapp, för att kunna använda path till bilden vid upload i storage.
        req.files.image.mv(`./server/images/hamster-${hamsters.length+1}.jpg`)

        await storage.bucket().upload(`./server/images/hamster-${hamsters.length+1}.jpg`, 
            {destination: `hamsters/hamster-${hamsters.length+1}.jpg`});
        res.status(200).send({msg: "File uploaded"});
        //Ta bort bild från mapp, finns nu i storage
        fs.unlink(`./server/images/hamster-${hamsters.length+1}.jpg`, (error) => {
            if(error) { 
                console.log(error)
                return
            } else {
                console.log("File deleted");
            }
        });
    }catch(err){
        res.status(500).send(err);
    }

});

module.exports = router; 