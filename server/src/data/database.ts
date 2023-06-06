import { Database } from 'sqlite3'
import User from '../model/User';

class GameCenterDataStore {
    private db: Database

    constructor() {
        this.db = new Database('gcdb.sqlite')

        this.db.exec(fs.readFileSync(__dirname + '/sql/create.sql').toString());
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
                coins = (coins + ${dCoins})
            WHERE userID = '${userID}'
            `,
            (error) => { if(error) console.log(error) }
        )
    }
}

export default GameCenterDataStore