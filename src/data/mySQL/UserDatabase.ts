import { CustomError } from "../../error/customError";
import { user } from "../../model/user";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

    public insertUser = async (user: user) => {
        try {
            await UserDatabase.connection
                .insert({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                })
                .into("cookenu_users");
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };

    public findUser = async (email: string) => {
        try {
            const result = await UserDatabase.connection("cookenu_users")
                .select()
                .where({ email });
            return result[0];
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public getProfile = async (token: string) => {

        try {
            const result = await UserDatabase.connection("cookenu_users")
                .select('id', 'name', 'email')
                .where({ id: token })
            return result[0];
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public getUser = async (idUser:string): Promise<user[]> => {
        try {
            const user = await UserDatabase.connection
                .select("id","name","email")
                .from("cookenu_users")
                .where("id",idUser);
            return user;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };

    // public getAllUsers = async (): Promise<user[]> => {
    //     try {
    //         const allUsers = await UserDatabase.connection
    //             .select()
    //             .from("cookenu_users");
    //         return allUsers;
    //     } catch (error: any) {
    //         throw new CustomError(error.statusCode, error.message);
    //     }
    // };

}
