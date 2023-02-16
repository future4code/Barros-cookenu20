import { user} from "../model/user";

export interface UserRepository {
    findUser(email: string): unknown;
    insertUser(user: user): unknown;
    getUsers(): Promise<user[]>
}