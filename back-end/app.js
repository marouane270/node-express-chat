require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sChat= require('./models/exemple');

// export one function that gets called once as the server is being initialized
module.exports = function (app, server) {

    const mongoose = require('mongoose');
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true,
        useUnifiedTopology: true })
      .then(() => console.log('DB is OK'))
      .catch(() => console.log('DB failed'));



    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', '*');
        next();
    });

    app.use(express.json());

    const io = require('socket.io')(server, {
        cors: {
            origin: "http://127.0.0.1:5503",
            methods: ["GET", "POST"]
        }
    })

    require('./socket/chat')(io);

    app.use(function (req, res, next) { req.io = io; next(); });

    app.get('/test', (req, res, next) => {
        res.status(200).json({ hello: 'world' })
    })

    app.post("/user", (req, res, next)=>{

        const user = new sChat
      })
    
      
    app.get("/messages", (req, res,next)=>{
      sChat.find()
      .then(mess => res.status(200).json(mess))
      .catch(error => res.status(400).json({ error }));
      console.log(sChat)
    })
    
    *//API affiche idUnique 
    app.get("/messByOneUser", (req, res)=>{
      sChat.aggregate(
        
        [
          { 
            $group : {
              _id: "$userId",
              count: {$sum: 1} 
            }
          }
        ],
    
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.json(result); 
          }
        }
      )
    })
    
    //API affiche le nb de message envoyé
      app.get("/nbMess", (req, res, next) => {
        sChat.count("$socket.id", function(err, count) {
          console.log("nombre de msg : ", count);
    
          let msg = "Le nombre de message est de ";
    
          res.json(msg + count);
        });
      });
}