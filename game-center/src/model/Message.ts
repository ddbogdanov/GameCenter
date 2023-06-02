import User from "./User"

type Message = {
    user: User
    message: string
    timestamp: Date
}

export default Message