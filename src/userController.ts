import { userService } from "./userService";

class UserController {

    async getUserById(id: number) {
        try {
            const user = await userService.getUserById(id)
            return user
        } catch (e) {
            return new Error(e)
        }
    }
}

export const userController = new UserController()