import socketio from 'socket.io'
import GameCenterDataStore from '../data/database'
import RoomStore from '../model/RoomStore'
import SessionStore from '../model/SessionStore'
import CrashCoinRoom from '../model/rooms/CrashCoinRoom'
import CrashCoinGame from '../model/games/crashcoin/CrashCoinGame'
import User from '../model/User'

const crashCoinEvents = (io: socketio.Server, socket: socketio.Socket, db: GameCenterDataStore, roomStore: RoomStore, sessionStore: SessionStore) => {
    socket.on('joinCrashCoinGame', (data, callback) => {

        let rooms = roomStore.findAllCrashCoinRooms()
        let availableRoom: CrashCoinRoom | undefined = undefined
        for(const room of rooms) {
            if(!room.isFull()) {
                availableRoom = room
                break
            }
        }

        if(rooms.length === 0 || !availableRoom) {
            let room = roomStore.saveCrashCoinRoom(new CrashCoinRoom(
                new CrashCoinGame(1),
                [new User(data.username, data.userID, data.coins, data.avatarID, data.avatarBackgroundColor)]
            ))

            socket.join(room.getRoomID())
            room.getGame().startGame(io, room.getRoomID())
            return callback(room)
        }

        socket.join(availableRoom.getRoomID())
        return callback(availableRoom)
    })
}

export default crashCoinEvents