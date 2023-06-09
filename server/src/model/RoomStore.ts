import crypto from 'crypto'
import Room from "./rooms/Room"
import ChessRoom from './rooms/ChessRoom'
import CrashCoinRoom from './rooms/CrashCoinRoom'

class RoomStore {
    private chessRooms: Map<string, ChessRoom>
    private crashCoinRooms: Map<string, CrashCoinRoom>

    constructor() {
        this.chessRooms = new Map()
        this.crashCoinRooms = new Map()
    }

    public findRoom(roomID: string): Room | undefined {
        let room = this.chessRooms.get(roomID) || this.crashCoinRooms.get(roomID)

        return room ? room : undefined
    }
    public findChessRoom(roomID: string): ChessRoom | undefined {
        return this.chessRooms.get(roomID)
    }
    public findCrashCoinRoom(roomID: string): CrashCoinRoom | undefined {
        return this.crashCoinRooms.get(roomID)
    }
    public findAllCrashCoinRooms(): Array<CrashCoinRoom> {
        return [...this.crashCoinRooms.values()]
    }
    public findAllRooms(): Array<Room> {
        return [
            ...this.chessRooms.values(),
            ...this.crashCoinRooms.values()
        ]
    }
    public saveChessRoom(room: ChessRoom): ChessRoom {
        room.setRoomID(this.findRandomRoomID())
        this.chessRooms.set(room.getRoomID(), room)

        return room
    }
    public saveCrashCoinRoom(room: CrashCoinRoom): CrashCoinRoom {
        room.setRoomID(this.findRandomRoomID())
        this.crashCoinRooms.set(room.getRoomID(), room)

        return room
    }

    public deleteRoom(roomID: string) {
        this.chessRooms.delete(roomID)
        this.crashCoinRooms.delete(roomID)
    }

    /* Utility Functions */
    private generateRandomRoomID() { // TODO Export as modules along with generateUser and generateSession ID functions
        return crypto.randomBytes(3).toString("hex").toUpperCase()
    }
    private findRandomRoomID(): string {
        let roomID = this.generateRandomRoomID()
        let found = false

        while(!found) {
            if(this.findAllRooms().find(room => roomID == room.getRoomID())) {
                roomID = this.generateRandomRoomID()
                break
            }
            found = true
        }
        return roomID
    }
}

export default RoomStore