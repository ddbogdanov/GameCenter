import socketio from 'socket.io'
import GameCenterDataStore from '../data/database'
import Game from '../model/games/Game'
import Room from '../model/rooms/Room'
import RoomStore from '../model/RoomStore'
import User from '../model/User'


const checkersEvents = (io: socketio.Server, socket: socketio.Socket, db: GameCenterDataStore, roomStore: RoomStore) => {
    socket.on('newCheckersGame', (data, callback) => {
        // let room = roomStore.saveRoom(new Room(Game.CHECKERS, [new User(data.username, data.userID, data.coins, data.avatarID, data.avatarBackgroundColor)]))
        // socket.join(room.getRoomID())

        return callback('Not implemented yet')
    })
}

export default checkersEvents