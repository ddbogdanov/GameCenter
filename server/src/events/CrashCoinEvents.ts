import socketio from 'socket.io'
import GameCenterDataStore from '../data/database'
import RoomStore from '../model/RoomStore'
import SessionStore from '../model/SessionStore'
import CrashCoinRoom from '../model/rooms/CrashCoinRoom'
import CrashCoinGame from '../model/games/crashcoin/CrashCoinGame'
import User from '../model/User'
import CrashCoinBet from '../model/games/crashcoin/CrashCoinBet'

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
            room.getGame().startGame(io, room.getRoomID(), sessionStore, db)
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
            return callback({ 
                status: false, 
                message: 'Could not find game, or user is not in room' 
            })
        }
        
        let bet = new CrashCoinBet(user, data.wager, data.roomID, data.sessionID, socket.id, data.cashout)
        let betPlaced = game.placeBet(bet, sessionStore, db, io)

        if(betPlaced) {
            return callback({ 
                status: true, 
                coins: sessionStore.findSession(data.sessionID)?.getUser().getCoins(),
                lastBet: bet.getWager().toFixed(2) 
            })
        }
        return callback({ 
            status: false, 
            message: 'Bet could not be placed' 
        })
    })

    socket.on('cashout', (data, callback) => {
        let room = roomStore.findCrashCoinRoom(data.roomID)
        let game = room?.getGame()
        let user = room?.getUsers().find((user) => user.getUserID() == data.userID)

        if(!game || !user) {
            return callback({ 
                status: false, 
                message: 'Could not find game, or user is not in room' 
            })
        }
        
        let profit = game.cashOut(user, data.roomID, sessionStore, db, io)

        if(profit) {
            return callback({ 
                status: true, 
                coins: sessionStore.findSession(data.sessionID)?.getUser().getCoins(),
                profit: profit.toFixed(4) 
            })
        }
        return callback({ 
            status: false, 
            message: 'Could not cashout' 
        })
    })
}

export default crashCoinEvents