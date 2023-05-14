import User from './User'

interface Session {
    user: User
    sessionID: string,
    connected: boolean
}