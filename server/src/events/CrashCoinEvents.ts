import socketio from 'socket.io'
import GameCenterDataStore from '../data/database'
import RoomStore from '../model/RoomStore'
import SessionStore from '../model/SessionStore'
import CrashCoinRoom from '../model/rooms/CrashCoinRoom'
import CrashCoinGame from '../model/games/crashcoin/CrashCoinGame'
import User from '../model/User'
import CoinBet from '../model/games/crashcoin/CoinBet'

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

        availableRoom.addUser(new User(data.username, data.userID, data.coins, data.avatarID, data.avatarBackgroundColor))
        socket.join(availableRoom.getRoomID())
        return callback(availableRoom)
    })

    socket.on('placeBet', (data, callback) => {
        let room = roomStore.findCrashCoinRoom(data.roomID)
        let game = room?.getGame()
        let user = room?.getUsers().find((user) => user.getUserID() == data.userID)

        if(!game || !user) {
            return callback('Could not find game, or user is not in room')
        }
        let bet = new CoinBet(user, data.wager, data.roomID, data.cashout)
        let betPlaced = game.placeBet(bet, io)

        if(betPlaced) {
            return callback('Bet placed')
        }
        return callback('Bet could not be placed')
    })

    socket.on('cashout', (data, callback) => {
        let room = roomStore.findCrashCoinRoom(data.roomID)
        let game = room?.getGame()
        let user = room?.getUsers().find((user) => user.getUserID() == data.userID)

        if(!game || !user) {
            return callback('Could not find game, or user is not in room')
        }
        
        let cashedOut = game.cashOut(user, data.roomID, io)

        if(cashedOut) {
            return callback('Cashed out')
        }
        return callback('Could not cashout')
    })
}

export default crashCoinEvents