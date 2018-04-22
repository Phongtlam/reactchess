const socketIo = require('socket.io');
const Chess = require('../../src/lib/chess').Chess;
const YellowSubsAction = require('../../src/lib/yellowsub.ai');
const redisClient = require('../redis');
const shortid = require('shortid');

const game = new Chess();

module.exports = (server) => {
  const io = socketIo(server);
  io.on('connect', (socket) => {
    console.log('new user connected on socketId', socket.id); 
    
    const emitter = (roomId, channel, payload, othersOnly) => {
      if (othersOnly) {
        socket.to(roomId).emit(channel, payload);
      } else {
        io.in(roomId).emit(channel, payload);
      }
    };

    redisClient.keys('*', (err, roomList) => {
      console.log('rooms listing', roomList)
      if (err) return console.log(err);
    });

    let roomId = '';
    let userName = '';
    socket.on('user-channel', (userInfo) => {
      userName = userInfo.userName;
      if (userInfo.roomId === '') {
        roomId = shortid.generate();
      } else {
        roomId = userInfo.roomId;
      }
      socket.join(roomId);
      redisClient.hset(roomId, userInfo.userName, socket.id);
      const emitNewUser = (roomUsers) => {
        emitter(roomId, 'user-channel', {
          userName,
          roomId,
          roomUsers
        });
        emitter(socket.id, 'message', {
          from: 'chatbot',
          roomId,
          message: ''
        });
        emitter(roomId, 'message', {
          from: 'chatbot',
          message: `${userInfo.userName} has join the room`,
        }, true);
      };
      getUsersCount(roomId, emitNewUser);
    });

    let numRounds = 0;
    socket.on('board-update', (fen, isAi, isStart, orientation) => {
      emitter(roomId, 'board-update', fen, true);
      if (isAi) {
        if (isStart) {
          game.reset();
          numRounds = 0;
        }
        game.load(fen);
        const depth = numRounds > 9 ? 3 : 2;
        if (numRounds > 9 ) {
          console.log('round 10 started');
        }
        const color = orientation === 'w' ? 'b' : 'w';
        console.log('what is color', color)
        if (game.turn() === color) {
          const bestMove = YellowSubsAction(2, game, true, numRounds, color);
          game.move(bestMove);
          const aiBoard = game.fen();
          if (aiBoard) {
            numRounds += 1;
          }
          let status = 'normal';
          if (game.in_check()) {
            status = 'check';
          } else if (game.in_checkmate() || game.move() === []) {
            status = 'check_mate';
          }
          emitter(roomId, 'board-update', aiBoard);
        }
      }
    });

    socket.on('message', messageObj => {
      messageObj.timestamp = new Date().toLocaleTimeString();
      emitter(roomId, 'message', messageObj);
    });

    socket.on('disconnect', () => {
      io.in(roomId).clients( (err, clients) => {
        if (err) {
          console.log('Error when disconnect', err);
        }
        redisClient.hdel(roomId, userName, () => {
          if (clients.length === 0) {
            redisClient.del(roomId);
          }
          getUsersCount(roomId, onDisconnect);
        });
      });
      const onDisconnect = (userCount) => {
        emitter(roomId, 'user-channel', {
          userName,
          roomId,
          roomUsers: userCount,
        })
      };
    });
  });
}

const getUsersCount = (hashKey, callback) => {
  redisClient.hkeys(hashKey, (err, userCount) => {
    console.log(`usercount on ${hashKey}`, userCount)
    if (err) return console.log(err);
    if (callback) {
      callback(userCount);
    }
  });
}
