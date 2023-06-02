import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import events from './events/Events'
import SessionStore from '../src/model/SessionStore'
import RoomStore from './model/RoomStore'
import UserSocket from './model/UserSocket'
import Session from './model/Session'
import User from './model/User'
import GameCenterDataStore from './data/database'

const port = (process.env.PORT || 3000)
const sessionStore = new SessionStore()
const roomStore = new RoomStore()
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
    const username = socket.handshake.auth.username
    if(!username) {
        console.log("Username is required but was not provided")
        return next(new Error("Username is Required"))
    }

    if(sessionStore.isUserConnected(username)) {
        return next(new Error("Username is already connected"))
    }

    const sessionID = socket.handshake.auth.sessionID
    if(sessionID) {
        const session = sessionStore.findSession(sessionID)
        if(session) {
            session.setConnected(true)
            socket.session = session
            return next()
        }
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
    sessionStore.saveSession(socket.session)
    socket.emit("newSession", newSessionHandler(socket))
    socket.broadcast.emit('newConnection', socket.session.getUser().getUsername())

    // Register Event Listeners
    events(io, socket, db, sessionStore, roomStore)

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
    sessionStore.saveSession(socket.session.getSession());
    socket.broadcast.emit('newDisconnection', socket.session.getUser().getUsername())
}