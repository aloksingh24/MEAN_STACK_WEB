const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config=require('./config/database');
const path = require('path');

mongoose.Promise=global.Promise;
mongoose.connect(config.uri,(err)=>{
if(err){
    console.log("Could not connect to DB");
}
else{
    console.log("Connected to DB "+config.db);
}
});

app.use(express.static(__dirname+'/clientSide/dist') );
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname+'/clientSide/dist/index.html'));
  });

  app.listen(8080,() =>{
      console.log('Listing on port 8080');
  });
  