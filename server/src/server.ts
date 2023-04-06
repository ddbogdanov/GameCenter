import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import events from '../src/events/events'
import SessionStore from '../src/model/SessionStore'
import UserSocket from './model/UserSocket'
import Session from './model/Session'
import User from './model/User'

const port = (process.env.PORT || 3000)
const sessionStore = new SessionStore()

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
    console.log(`New Connection - ${JSON.stringify(socket.handshake.auth)}`)

    const sessionID = socket.handshake.auth.sessionID
    if(sessionID) {
        const session = sessionStore.findSession(sessionID)
        if(session) {
            socket.session = session
            return next()
        }
    }

    const username = socket.handshake.auth.username
    if(!username) {
        console.log("Username is required but was not provided")
        return next(new Error("Username is Required"))
    }
    socket.session = new Session(new User('username'))
    socket.user = new User(username)

    return next()
})

/* Socket.io */
io.on('connection', (socket) => {
    console.log(`Connected - ${JSON.stringify(socket.handshake.auth)}`)
    events(io, socket)

    socket.on('disconnect', () => {
        console.log('Socket Disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server up on port ${port}`)
})
