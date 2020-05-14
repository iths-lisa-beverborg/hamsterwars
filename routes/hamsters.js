const { Router } = require('express');
const { db } = require ('./../firebase');
const router = new Router();

//http://localhost:3000/hamsters


// GET a random hamster
router.get('/random', async (req, res) => {
    let hamstersRandom = []
    
    try {
        let data = await db.collection('hamsters').get();
        
        data.forEach(el => {
            hamstersRandom.push(el.data());
        }) 
        let random = Math.floor(Math.random()* hamstersRandom.length)
        res.send(hamstersRandom[random]);    
    }
    catch(err) {
        res.status(500).send(err);
    }   
})

// GET all hamsters
router.get('/', async (req, res)=>{
    let arr = []
    
    try{
        let data = await db.collection('hamsters').get();
        
        data.forEach(el =>{ 
            arr.push(el.data())
        })
        
        res.send(arr)
        
    }catch(err){
        res.status(500).send(err)
    }  
})

// GET hamster by Id
router.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id); 
    let hamsterId = []
    
    try{
        let hamstersData = await db.collection('hamsters').where('id', '==', id).get()
        
        hamstersData.forEach(hamster =>{ 
            hamsterId.push(hamster.data())
        })    
        res.send(hamsterId[0])     
    }catch(err){
        res.status(500).send(err)
    }
})


// PUT update wins, defeats, games
router.put('/:id/results', async (req, res) => {
    
    let id = parseInt(req.params.id); 
    //write
    let hamsters = await db.collection('hamsters').where('id', '==', id).get()
    
    hamsters.forEach(hamster  => { 
        
        let data = hamster.data()
        
        db.collection('hamsters').doc(hamster.id).update({ wins:data.wins+req.body.wins,  defeats:data.defeats+req.body.defeats, games:data.games+req.body.games})
        .then(() => {res.send('Hamster updated.')})
    })
})

module.exports = router;