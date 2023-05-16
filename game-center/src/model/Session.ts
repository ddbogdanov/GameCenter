import User from './User'

class Session {
    user = new User()
    sessionID = ''
    connected = false
}

export default Session