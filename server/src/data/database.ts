import { Database } from 'sqlite3'
import User from '../model/User';
import fs from 'fs'

class GameCenterDataStore {
    private db: Database

    constructor() {
        this.db = new Database('gcdb.sqlite')

        this.db.exec(
            `
            CREATE TABLE IF NOT EXISTS users (
                userID VARCHAR(200) PRIMARY KEY,
                username VARCHAR(200) NOT NULL,
                coins INTEGER NOT NULL,
                avatarID VARCHAR(200) NOT NULL,
                avatarBackgroundColor VARCHAR(20) NOT NULL
            )
            `
        );
    }

    public findUser(username: string, callback: Function) {
        this.db.get(
            `SELECT * FROM users WHERE username = ?`, 
            username, 
            (error, data: any) => {
                if(error) {
                    console.log(error)
                    return callback(null)
                }
                if(!data) {
                    return callback(null)
                }
                callback(new User(data.username, data.userID, data.coins, data.avatarID, data.avatarBackgroundColor))
            }
        )
    }
    public saveUser(user: User) {
        this.db.exec(
            `
            INSERT OR IGNORE INTO users (userID, username, coins, avatarID, avatarBackgroundColor)
            VALUES ('${user.getUserID()}', '${user.getUsername()}', ${user.getCoins()}, '${user.getAvatarID()}', '${user.getAvatarBackgroundColor()}')
            `,
            (error) => { if(error) console.log(error) }
        )
    }
    public updateUser(userID: string, avatarID: string, avatarBackgroundColor: string) {
        this.db.exec(
            `
            UPDATE users SET 
                avatarID = '${avatarID}',
                avatarBackgroundColor = '${avatarBackgroundColor}'
            WHERE userID = '${userID}'
            `,
            (error) => { if(error) console.log(error) }
        )
    }
    public updateCoins(userID: string, dCoins: number) {
        this.db.exec(
            `
            UPDATE users SET
                coins = round((coins + ${dCoins}), 4)
            WHERE userID = '${userID}'
            `,
            (error) => { if(error) console.log(error) }
        )
    }
}

export default GameCenterDataStore