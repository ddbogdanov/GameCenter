import { reactive } from "vue";
import { io } from "socket.io-client";
import router from "./router/index"
import State from '@/model/State'
import User from "./model/User";

export const state = reactive(new State());

// "undefined" means the URL will be computed from the `window.location` object
// "https://game-center-server.onrender.com"
const URL = "https://game-center-server.onrender.com";

export const socket = io(URL, {
  autoConnect: false
});

socket.on("connect", () => {
  state.connected = true
  router.push('/home')
})
socket.on("disconnect", () => {
  state.connected = false
})
socket.on('newConnection', (username: string) => {
  console.log(`User: ${username} joined`)
  state.activeUsers++
})
socket.on('newDisconnection', (username: string) => {
  console.log(`User: ${username} left`)
  state.activeUsers--
})
socket.on('otherPartyDisconnect', () => {
  location.reload()
})

socket.on('newSession', (sessionInfo) => {
  state.session = sessionInfo.session
  state.activeUsers = sessionInfo.activeUsers

  sessionStorage.setItem("gameCenterSessionID", sessionInfo.session.sessionID)
  sessionStorage.setItem("gameCenterSessionUsername", sessionInfo.session.user.username)
})
socket.on('userJoinedRoom', (user: User) => { 
  state.room.users.push(user)
})

socket.on("connect_error", (error) => {
  console.error(error)
});

export function disconnect() {
  const disconnectSocket = () => {
    sessionStorage.removeItem("gameCenterSessionID")
    sessionStorage.removeItem("gameCenterSessionUsername")
    socket.disconnect()
    router.push('/')
  }
  return {
    disconnectSocket
  }
}
