import { Database } from 'sqlite3'
import fs from 'fs'
import User from '../model/User';

class GameCenterDataStore {
    db: Database

    constructor() {
        this.db = new Database('gcdb.sqlite')

        this.db.exec(fs.readFileSync(__dirname + '/sql/create.sql').toString());
    }

    findUser(username: string, callback: Function) {
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
                callback(new User(data.username, data.userID, data.coins, data.avatarID))
            }
        )
    }
    saveUser(user: User) {
        this.db.exec(
            `
            INSERT OR IGNORE INTO users (userID, username, coins, avatarID)
            VALUES ('${user.getUserID()}', '${user.getUsername()}', ${user.getCoins()}, '${user.getAvatarID()}')
            `,
            (error) => { if(error) console.log(error) }
        )
    }
    updateUserAvatar(userID: string, avatarID: string) {
        this.db.exec(
            `
            UPDATE users
            SET avatarID = '${avatarID}'
            WHERE userID = '${userID}'
            `,
            (error) => { if(error) console.log(error) }
        )
    }
}

export default GameCenterDataStore