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

    // User profile events
    socket.on('updateAvatarID', (data: any) => { 
        db.updateUserAvatar(data.userID, data.avatarID)
        sessionStore.updateUserAvatarInSession(data.sessionID, data.avatarID)
    })

    // Game events
    chessEvents(io, socket, db, roomStore)
    checkersEvents(io, socket,db, roomStore)
    blackjackEvents(io, socket, db, roomStore)
}

export default events