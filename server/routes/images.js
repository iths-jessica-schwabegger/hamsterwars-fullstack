const { Router } = require('express');
const { storage } = require('./../firebase');
const router = new Router();




router.get('/:imgName', async (req,res) => {

    let img = await storage.bucket().file(`hamsters/${req.params.imgName}`).download();
    img = Buffer.concat(img);

    res.status(200).contentType("jpg").send(img);
});

module.exports = router; 