import express from 'express'
import http from 'http'
import socketio, { DisconnectReason } from 'socket.io'
import events from '../src/events/events'
import SessionStore from '../src/model/SessionStore'
import UserSocket from './model/UserSocket'
import Session from './model/Session'
import User from './model/User'
import GameCenterDataStore from './data/database'

const port = (process.env.PORT || 3000)
const sessionStore = new SessionStore()
const db = new GameCenterDataStore()

const app = express()
const server = http.createServer(app)
const io = new socketio.Server(server, {
    cors: {
        origin: '*'
    }
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.use(async (socket: UserSocket, next) => {
    const sessionID = socket.handshake.auth.sessionID
    if(sessionID) {
        const session = sessionStore.findSession(sessionID)
        if(session) {
            session.setConnected(true)
            socket.session = session
            return next()
        }
    }

    const username = socket.handshake.auth.username
    if(!username) {
        console.log("Username is required but was not provided")
        return next(new Error("Username is Required"))
    }

    db.findUser(username, (data: User) => {
        if(!data) {
            socket.session = new Session(new User(username), true)
            db.saveUser(socket.session.getUser())
            return next()
        }

        socket.session = new Session(data, true)
        return next()
    })
})

/* Socket.io */
io.on('connection', (socket: UserSocket) => {
    if(!socket.session) return // ????

    console.log(`Connected - ${JSON.stringify(socket.session)}`)
    sessionStore.saveSession(socket.session.getSessionID(), socket.session)
    socket.emit("newSession", newSessionHandler(socket))
    socket.broadcast.emit('newConnection', socket.session.getUser().getUsername())

    // Register Event Listeners
    events(io, socket)

    socket.on('updateAvatarID', (data: any) => { 
        db.updateUserAvatar(data.userID, data.avatarID)
        sessionStore.updateUserAvatarInSession(data.sessionID, data.avatarID)
    })
    socket.on('disconnect', () => disconnectHandler(socket))
})

server.listen(port, () => {
    console.log(`Server up on port ${port}`)
})

// Utility Functions and what not

function newSessionHandler(socket: UserSocket) {
    if(!socket.session) return
    const sessionInfo = {
        session: socket.session,
        activeUsers: sessionStore.countConnectedUsers()
    }

    return sessionInfo
}
function disconnectHandler(socket: UserSocket): any {
    if(!socket.session) return 
    console.log('Socket Disconnected')

    socket.session.getSession().setConnected(false)
    sessionStore.saveSession(socket.session.getSessionID(), socket.session.getSession());
    socket.broadcast.emit('newDisconnection', socket.session.getUser().getUsername())
}