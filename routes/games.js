const { Router } = require('express');
const { db } = require ('./../firebase');
let router = new Router();

// POST a new game
router.post('/', async (req, res) => {
    try {
        console.log('POST')
        let newGame = await db.collection('games').doc();
        
        await newGame.set({
            id:newGame.id,
            timeStamp: Date.now(),
            contestants: req.body.contestants,
            winner: req.body.winner
        })
        res.send({ msg: 'Save a game!'});
    }
    catch(err) {
        res.send(500).send(err);
    }
})


// GET all games
router.get('/', async (req, res)=>{
    let allGames = []
    
    try{    
        let data = await db.collection('games').get();
        data.forEach(el =>{ 
            allGames.push(el.data());
        })
        
        res.send(allGames)
        
    }catch(err){
        res.status(500).send(err)
    }   
})

module.exports = router;