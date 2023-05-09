import { Socket } from "socket.io";
import Session from "./Session";

interface UserSocket extends Socket {
    session?: Session
}

export default UserSocket

 