import socketio from 'socket.io'
import GameCenterDataStore from '../data/database'
import Game from '../model/games/Game'
import ChessRoom from '../model/rooms/ChessRoom'
import RoomStore from '../model/RoomStore'
import User from '../model/User'
import ChessGame from '../model/games/chess/ChessGame'
import ChessRules from '../model/games/chess/ChessRules'
import Status from '../model/Status'
import SessionStore from '../model/SessionStore'


const chessEvents = (io: socketio.Server, socket: socketio.Socket, db: GameCenterDataStore, roomStore: RoomStore, sessionStore: SessionStore) => {
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
        let session = sessionStore.findSession(data.sessionID)

        if(!room || !session) {
            return callback('Could not find room and/or session')
        }
        room.setStatus(Status.FINISHED)

        let isUserWhite = data.user.username == room.getGame().getWhite().getUsername()
        let isUserBlack = data.user.username == room.getGame().getBlack().getUsername()

        // TODO: ChessRules should probably also hold the UserID. Then room.getUsers().find() will not be needed
        if(data.color == 'black' && isUserWhite) {
            let winningUser = room.getUsers().find(user => 
                user.getUsername() == room?.getGame().getWhite().getUsername())?.getUserID()
            
            if(!winningUser) return

            db.updateCoins(winningUser, 25)
            session.getUser().updateCoins(25)
            return callback({ message: 'You won!', session: session })
        }
        else if(data.color == 'white' && isUserBlack) {
            let winningUser = room.getUsers().find(user => 
                user.getUsername() == room?.getGame().getBlack().getUsername())?.getUserID()

            if(!winningUser) return

            db.updateCoins(winningUser, 25)
            session.getUser().updateCoins(25)
            return callback({ message: 'You won!', session: session })
        }
        else {
            return callback({ message: 'You lost!', session: session })
        }
    })
}

export default chessEvents