import socketio from 'socket.io'
import GameCenterDataStore from '../data/database'
import Game from '../model/Game'
import Room from '../model/Room'
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