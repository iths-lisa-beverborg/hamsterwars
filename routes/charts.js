const { Router } = require('express');
const { db } = require ('./../firebase');
let router = new Router();

// GET 5 hamsters that won most
router.get('/top', async (req, res) => {
    let topHamsters= []
    console.log('TOP hamsters')
    
    const winners = await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get()
    winners.forEach(hamster=> topHamsters.push(hamster.data()));
    
    res.send(topHamsters)
})


// GET 5 hamsters that lost most
router.get('/bottom', async (req, res) => {
    let bottomHamsters= []
    console.log('Return 5 most losing hamsters.')
    
    const loosers = await db.collection('hamsters').orderBy('defeats', 'desc').limit(5).get()
    loosers.forEach(hamster=> bottomHamsters.push(hamster.data()));
    
    res.send(bottomHamsters)
})

module.exports = router;