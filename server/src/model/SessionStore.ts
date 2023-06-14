import Session from "./Session"

class SessionStore {
    sessions: Map<string, Session>

    constructor() {
        this.sessions = new Map()
    }

    public findSession(id: string): Session | undefined {
        return this.sessions.get(id)
    }
    public isUserConnected(username: string): boolean {
        return !![...this.sessions.values()].find(session => 
            session.getUser().getUsername() == username)?.isConnected()
    }
    public saveSession(session: Session): void {
        this.sessions.set(session.getSessionID(), session)
    }
    public updateUserInSession(sessionID: string, avatarID: string, avatarBackgroundColor: string, coins: number): boolean {
        let session = this.findSession(sessionID)
        if(!session) {
            return false
        }

        session.getUser().setAvatarID(avatarID)
                         .setAvatarBackgroundColor(avatarBackgroundColor)
                         .setCoins(coins)
        return true
    }
    public updateCoinsInSession(sessionID: string, dCoins: number) {
        let session = this.findSession(sessionID)
        if(!session) {
            return false
        }

        session.getUser().updateCoins(dCoins)
        return true
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