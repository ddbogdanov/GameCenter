import socketio from 'socket.io'

const events = (io: socketio.Server, socket: socketio.Socket) => {
    socket.on('yo', () => {
        console.log('Yo whats up')
    })

    // function helloWorld(): void {
    //     console.log('Yo whats up')
    // }
}

export default events