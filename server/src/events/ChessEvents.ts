import socketio from 'socket.io'
import GameCenterDataStore from '../data/database'
import Game from '../model/games/Game'
import Room from '../model/Room'
import RoomStore from '../model/RoomStore'
import User from '../model/User'
import ChessGame from '../model/games/chess/ChessGame'


const chessEvents = (io: socketio.Server, socket: socketio.Socket, db: GameCenterDataStore, roomStore: RoomStore) => {
    socket.on('newChessGame', (data, callback) => {
        let room = roomStore.saveRoom(new Room(new ChessGame(), [new User(data.username, data.userID, data.coins, data.avatarID, data.avatarBackgroundColor)]))
        socket.join(room.getRoomID())

        return callback(room)
    })
}

export default chessEvents