import crypto from 'crypto'
import Room from "./Room";

class RoomStore {
    private rooms: Map<string, Room>

    constructor() {
        this.rooms = new Map()
    }

    public findRoom(roomID: string): Room | undefined {
        return this.rooms.get(roomID)
    }
    public findAllRooms(): Array<Room> {
        return [...this.rooms.values()]
    }
    public saveRoom(room: Room): Room {
        let roomID = this.generateRandomRoomID()
        let isRoomIDSet = false

        while(!isRoomIDSet) {
            if(this.findRoom(roomID)) {
                roomID = this.generateRandomRoomID()
                break
            }
            room.setRoomID(roomID)
            isRoomIDSet = true
        }

        this.rooms.set(room.getRoomID(), room)
        return room
    }

    private generateRandomRoomID() { // TODO Export as modules along with generateUser and generateSession ID functions
        return crypto.randomBytes(3).toString("hex").toUpperCase()
    }
}

export default RoomStore