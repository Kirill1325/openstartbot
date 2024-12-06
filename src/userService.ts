import { pool } from "./bdConfig"
import { User } from "./types"

class UserService {

    async getUserById(id: number) {
        const user: User = (await pool.query('SELECT * FROM users WHERE id = $1', [id])).rows[0]
        if (user) {
            console.log('user', user)
            return user
        } else {
            throw new Error('User not found')
        }
    }
}

export const userService = new UserService()