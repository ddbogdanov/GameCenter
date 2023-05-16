import Session from './Session'
import Room from './Room'

class State {
    connected: boolean
    activeUsers: number
    session: Session
    room: Room

    constructor(connected?: boolean, activeUsers?: number, session?: Session, room?: Room) {
        this.connected = connected ?? false
        this.activeUsers = activeUsers ?? 0
        this.session = session ?? new Session()
        this.room = room ?? new Room()
    }
}

export default State