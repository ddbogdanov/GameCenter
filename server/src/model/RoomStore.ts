import crypto from 'crypto'
import Room from "./rooms/Room";
import ChessRoom from './rooms/ChessRoom';

class RoomStore {
    private chessRooms: Map<string, ChessRoom>

    constructor() {
        this.chessRooms = new Map()
    }

    public findRoom(roomID: string): Room | undefined {
        let chessRoom = this.chessRooms.get(roomID)

        return chessRoom ? chessRoom : undefined
    }
    public findChessRoom(roomID: string): ChessRoom | undefined {
        return this.chessRooms.get(roomID)
    }
    public findAllRooms(): Array<Room> {
        return [...this.chessRooms.values()]
    }
    public saveChessRoom(room: ChessRoom): ChessRoom {
        room.setRoomID(this.findRandomRoomID())
        this.chessRooms.set(room.getRoomID(), room)

        return room
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