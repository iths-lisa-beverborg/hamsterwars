//GET 
const { Router } = require('express');
const { db } = require ('./../firebase');
let router = new Router();


// GET total amount of matches played
router.get('/total', async (req, res)=>{
    let total = []
    
    try{
        let data = await db.collection('games').get();
        
        data.forEach(el =>{ 
            total.push(el.data())
        })
        
        //JSON format
        res.send({ totalGames: total.length })
        
    }catch(err){
        res.status(500).send(err)
    }  
})


module.exports = router;