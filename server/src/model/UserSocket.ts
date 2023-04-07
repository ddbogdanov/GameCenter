import { Socket } from "socket.io";
import Session from "./Session";
import User from "./User";

interface UserSocket extends Socket {
    session?: Session
}

export default UserSocket

 