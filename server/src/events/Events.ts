import socketio from 'socket.io'
import GameCenterDataStore from '../data/database'
import RoomStore from '../model/RoomStore'
import SessionStore from '../model/SessionStore'
import blackjackEvents from './BlackjackEvents'
import checkersEvents from './CheckersEvents'
import chessEvents from './ChessEvents'

const events = (io: socketio.Server, socket: socketio.Socket, db: GameCenterDataStore, sessionStore: SessionStore, roomStore: RoomStore) => {

    // Generic events
    socket.on('getAllRooms', (callback) => {
        return callback(roomStore.findAllRooms())
    })
    // TODO create a response error class with status and message.
    socket.on('joinRoom', (data, callback) => {
        let room = roomStore.findRoom(data.roomID)
        let session = sessionStore.findSession(data.session.sessionID)

        if(!room) {
            return callback('Could not find room')
        }
        if(!session) {
            return callback('Could not find session')
        }
        if(io.of('/').adapter.rooms.get(data.roomID)?.size === room.getGame().getMaximumUsers()) {
            return callback(`Room ${room.getRoomID()} is full`)
        }
        else if(room.isUserInRoom(data.session.user.userID)) {
            return callback(`User ${data.session.user.userID} is already in room`)
        }

        socket.join(data.roomID)
        socket.to(data.roomID).emit('userJoinedRoom', session.getUser())
        room.addUser(session.getUser())

        return callback(room)
    })
    socket.on('disconnecting', () => {
        socket.rooms.forEach((room) => {
            io.to(room).emit('otherPartyDisconnect')
            roomStore.deleteRoom(room)
        })
    })

    // Chat events
    socket.on('sendMessage', (data: any) => {
        if(!data.roomID) {
            // TODO broadcast to global chat?
            return
        }
        data.message.timestamp = new Date(Date.now())
        socket.to(data.roomID).emit('recieveGameMessage', data.message)
    })
    socket.on('sendEmote', (data: any) => {
        socket.to(data.roomID).emit('recieveEmote')
    })

    // User profile events
    socket.on('updateUser', (data: any) => { 
        db.updateUser(data.userID, data.avatarID, data.avatarBackgroundColor)
        sessionStore.updateUserInSession(data.sessionID, data.avatarID, data.avatarBackgroundColor)
    })
    socket.on('addCoins', (data: any) => {
        db.updateCoins(data.userID, data.coins)
    })

    // Game events
    chessEvents(io, socket, db, roomStore, sessionStore)
    checkersEvents(io, socket,db, roomStore)
    blackjackEvents(io, socket, db, roomStore)
}

export default events
