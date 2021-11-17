const sChat = require('../models/exemple');


module.exports = function (io) {

  io.on('connection', (socket) => {
    console.log(`Connecté au client ${socket.id}`)
    io.emit('notification', { type: 'new_user', data: socket.id });

    // Listener sur la déconnexion
    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected`);
      io.emit('notification', { type: 'removed_user', data: socket.id });
    });

    // Création de l'objet "chat" de Mongoose (schéma)
    socket.on('plus-one-chat', (msg, today,id ) => {
      
      const chat = new sChat({
        userId: id,
        username: "null",
        sessionId: socket.id,
        text: msg,
      });
  
      // Sauvegarde dans la base de données
      chat.save().then(() => {
      }).catch((error) => {
          console.log(error)
      })
      
  });

  })
}