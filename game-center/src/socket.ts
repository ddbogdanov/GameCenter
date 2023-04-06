import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  totalUsers: 0,
});

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
const URL = "http://localhost:3000"

export const socket = io(URL, {
  autoConnect: false
});

socket.on("connect", () => {
  state.connected = true
})

socket.on("disconnect", () => {
  state.connected = false
})

socket.on('hello', (data) => {
  alert(data)
})

socket.on("connect_error", (error) => {
  console.error(error)
});

