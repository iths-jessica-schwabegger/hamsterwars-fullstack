const { Router } = require('express');
const { storage } = require('./../firebase');
const router = new Router();




router.get('/:filename', async (req,res) => {

    let img = await storage.bucket().file(`hamsters/${req.params.filename}`).download();
    img = Buffer.concat(img);

    res.status(200).contentType("jpg").send(img);
});

module.exports = router; 