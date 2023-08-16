import socketio from 'socket.io'
import GameCenterDataStore from '../data/database'
import Game from '../model/games/Game'
import Room from '../model/rooms/Room'
import RoomStore from '../model/RoomStore'
import User from '../model/User'


const blackjackEvents = (io: socketio.Server, socket: socketio.Socket, db: GameCenterDataStore, roomStore: RoomStore) => {
    socket.on('newBlackjackGame', (data, callback) => {
        
    })
}

export default blackjackEvents