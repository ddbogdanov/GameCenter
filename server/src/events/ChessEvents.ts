import socketio from 'socket.io'
import GameCenterDataStore from '../data/database'
import Game from '../model/Game'
import Room from '../model/Room'
import RoomStore from '../model/RoomStore'
import User from '../model/User'


const chessEvents = (io: socketio.Server, socket: socketio.Socket, db: GameCenterDataStore, roomStore: RoomStore) => {
    socket.on('newChessGame', (data, callback) => {
        let room = roomStore.saveRoom(new Room(Game.CHESS, [new User(data.username, data.userID, data.coins, data.avatarID)]))
        socket.join(room.getRoomID())

        console.log(`New room ${room.getRoomID()} was created`)
        return callback({ room })
    })
}

export default chessEvents