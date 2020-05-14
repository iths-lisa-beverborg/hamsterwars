  
  const express = require('express');
  const app = express();
  
  app.use(express.static('public'))
  app.use(express.json());
  
  //Routes
  const hamstersRoute = require('./routes/hamsters');
  const gamesRoute = require('./routes/games');
  const chartsRoute = require('./routes/charts');
  const statsRoute = require('./routes/stats');
  
  app.use('/hamsters', hamstersRoute);
  app.use('/games',  gamesRoute);
  app.use('/charts', chartsRoute);
  app.use('/stats', statsRoute);
  
  app.listen(3000, () => {
    console.log('Server up n running!');
})