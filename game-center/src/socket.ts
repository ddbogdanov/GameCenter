import { reactive } from "vue";
import { io } from "socket.io-client";
import router from "./router/index"

export const state = reactive({
  connected: false,
  session: {
    user: {
      username: '',
      userID: ''
    },
    sessionID: '',
    connected: false
  },
  activeUsers: 0,
});

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
const URL = "http://localhost:3000"

export const socket = io(URL, {
  autoConnect: false
});

socket.on("connect", () => {
  state.connected = true
  router.push('/landing')
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

socket.on("newSession", (sessionInfo) => {
  state.session = sessionInfo.session
  state.activeUsers = sessionInfo.activeUsers

  sessionStorage.setItem("gameCenterSessionID", sessionInfo.session.sessionID)
  sessionStorage.setItem("gameCenterSessionUsername", sessionInfo.session.user.username)
})

socket.on("connect_error", (error) => {
  console.error(error)
});

