import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/mySQL/UserDatabase";
import { InputProfileDTO, LoginInputDTO, UserInputDTO } from "../model/user";

const userBusiness = new UserBusiness
const userDatabase = new UserDatabase

export class UserController {

    public createUser = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;

            const input: UserInputDTO = {
                name,
                email,
                password,
            };

            const token = await userBusiness.createUser(input);

            res.status(201).send({ message: "Usuário criado!", token });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

    public login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const input: LoginInputDTO = {
                email,
                password,
            };

            const token = await userBusiness.login(input);

            res.status(200).send({ message: "Usuário logado!", token });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

    public getProfile = async (req: Request, res: Response) => {
        try {
            const input: InputProfileDTO = {
                token: req.headers.authorization as string
            }
            const user = await userBusiness.getProfile(input)

            res.status(200).send(user);
        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    };

    public getUser = async (req: Request, res: Response): Promise<void> => {
        try {

            const id = req.params.id

            const input: InputProfileDTO = {
                token: req.headers.authorization as string
            }

            const users = await userBusiness.getUser(id, input)

            res.status(201).send(users)
        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    };

    // public getAllUsers = async (req: Request, res: Response): Promise<void> => {
    //     try {
    //         const users = await userBusiness.getAllUsers()

    //         res.status(201).send(users)
    //     } catch (error: any) {
    //         res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    //     }
    // };
}
