const { Router } = require('express');
const { storage } = require('./../firebase');
const fileUpload = require("express-fileupload");
const router = new Router();

// app.use(fileUpload());



router.get("/:imgName", async (req, res) => {

    let img = await storage.bucket().file(`hamsters/${req.params.imgName}`).download();
    img = Buffer.concat(img);

    res.status(200).contentType("jpg").send(img);
});


router.post("/", async (rew, res) => {



});


//Uppladdning av bilder till firebase storage.
// document.querySelector("button").addEventListener("click", (e) => {
//     e.preventDefault(); //Förhindrar att sidan laddas om vid knapptryck.
  
//     let file = document.querySelector("#file").files[0];
//     let storageRef = firebase.storage().ref("hamsters/" + file.name);
//     storageRef.put(file);
// })

module.exports = router; 