import socketio from 'socket.io'
import GameCenterDataStore from '../data/database'
import Game from '../model/games/Game'
import ChessRoom from '../model/rooms/ChessRoom'
import RoomStore from '../model/RoomStore'
import User from '../model/User'
import ChessGame from '../model/games/chess/ChessGame'
import ChessRules from '../model/games/chess/ChessRules'
import Status from '../model/Status'


const chessEvents = (io: socketio.Server, socket: socketio.Socket, db: GameCenterDataStore, roomStore: RoomStore) => {
    socket.on('newChessGame', (data, callback) => {
        let room = roomStore.saveChessRoom(new ChessRoom(
            new ChessGame(), 
            [new User(data.username, data.userID, data.coins, data.avatarID, data.avatarBackgroundColor)]
        ))
        socket.join(room.getRoomID())

        return callback(room)
    })

    socket.on('startChessGame', (data, callback) => {
        let room = roomStore.findChessRoom(data)
        if(!room) {
            return callback('Game not found')
        }
        else if(room.getGame().getMinimumUsers() > room.getUsers().length) {
            return callback('Not enough players')
        }

        let users = room.getUsers()
        room.setCurrentTurn(users[0].getUsername())
        room.getGame().setWhite(new ChessRules(users[0].getUsername(), '11-11-11'))
        room.getGame().setBlack(new ChessRules(users[1].getUsername(), '22-22-22'))

        room.setStatus(Status.PLAYING)
        
        socket.broadcast.to(room.getRoomID()).emit('startedChessGame', room)
        return callback(room)
    })

    socket.on('chessMove', (data) => {
        socket.broadcast.to(data.roomID).emit('recieveChessMove', data.move)
    })
    socket.on('checkmate', (data, callback) => {
        let room = roomStore.findChessRoom(data.roomID)

        if(!room) {
            return callback('Could not find room')
        }

        let victoriousUser = ''
        if(data.color == 'white') {
            victoriousUser = room.getGame().getWhite().getUsername()
        }
        else {
            victoriousUser = room.getGame().getBlack().getUsername()
        }

        // Give victoriousUser some coins or something
    })
}

export default chessEvents