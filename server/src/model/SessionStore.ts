import Session from "./Session"

class SessionStore {
    sessions: Map<string, Session>

    constructor() {
        this.sessions = new Map()
    }

    public findSession(id: string): Session | undefined {
        return this.sessions.get(id)
    }
    public saveSession(session: Session): void {
        this.sessions.set(session.getSessionID(), session)
    }
    public updateUserAvatarInSession(sessionID: string, avatarID: string) {
        let session = this.findSession(sessionID)
        if(!session) {
            return
        }

        session.getUser().setAvatarID(avatarID)
    }
    public countConnectedUsers(): number {
        let count = 0
        for(const[key, value] of this.sessions.entries()) {
            if (value.isConnected()) {
                ++count
            }
        }
        return count
    }
    public findAllSessions(): Array<Session> {
        return [...this.sessions.values()]
    }
}

export default SessionStore