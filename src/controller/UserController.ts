import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/mySQL/UserDatabase";
import { DelFriendDTO, FriendInputDTO, InputFeedDTO, InputProfileDTO, LoginInputDTO, UserInputDTO } from "../model/user";

const userBusiness = new UserBusiness
const userDatabase = new UserDatabase
const recipeBusiness = new RecipeBusiness

export class UserController {

    //CRIAR USUARIO

    public createUser = async (req: Request, res: Response) => {
        try {
            const { name, email, password, role } = req.body;

            const input: UserInputDTO = {
                name,
                email,
                password,
                role
            };
            const token = await userBusiness.createUser(input);

            res.status(201).send({ message: "Usuário criado!", token });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

    // LOGIN

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

    // BUSCAR PERFIL

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

            res.status(200).send(users)
        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    };

    //CRIAR AMIZADE 

    public createFriendship = async (req: Request, res: Response) => {
        try {
            const { friendId } = req.body;

            const input: FriendInputDTO = {
                friendId
            };

            await userBusiness.createFriendship(input);

            res.status(201).send({ message: "Amizade criada!" });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

    public deleteFriendship = async (req: Request, res: Response) => {
        try {
            const { friendId } = req.body;

            const input: InputProfileDTO = {
                token: req.headers.authorization as string
            }
            const inputFriend: DelFriendDTO = {
                friendId
            };

            await userBusiness.deleteFriend(input, inputFriend);
            res.status(200).send({ message: "Amizade desfeita!" });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await userBusiness.getAllUsers()

            res.status(201).send(users)
        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    };

    public getFeed = async (req: Request, res: Response) => {
        try {
            const input: InputFeedDTO = {
                token: req.headers.authorization as string
            }
            const user = await userBusiness.getFeed(input)

            res.status(200).send(user);
        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    };
}