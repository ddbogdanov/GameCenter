import Session from "./Session"

class SessionStore {
    sessions: Map<string, Session>

    constructor() {
        this.sessions = new Map()
    }

    findSession(id: string): Session | undefined {
        return this.sessions.get(id)
    }
    saveSession(id: string, session: Session): void {
        this.sessions.set(id, session)
    }

    findAllSessions(): Array<Session> {
        return [...this.sessions.values()]
    }
}

export default SessionStore