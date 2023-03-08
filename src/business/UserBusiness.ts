import { RecipeDatabase } from "../data/mySQL/RecipeDatabase";
import { UserDatabase } from "../data/mySQL/UserDatabase";
import { CustomError, InvalidEmail, InvalidName, InvalidPassword, InvaliRole, Unauthorized, UserNotFound } from "../error/customError";
import { delFriend, DelFriendDTO, friend, FriendInputDTO, InputFeedDTO, InputProfileDTO, LoginInputDTO, user, UserInputDTO, UserRole } from "../model/user";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const idGenerator = new IdGenerator()
const tokenGenerator = new TokenGenerator()
const userDatabase = new UserDatabase();
const hashManager = new HashManager()

const recipeDatabase = new RecipeDatabase()

// CRIA USUARIO

export class UserBusiness {
    public createUser = async (input: UserInputDTO): Promise<string> => {
        try {
            const { name, email, password, role } = input

            if (!name || !email || !password || !role) {
                throw new CustomError(400, '"name", "email", "password" e "role" devem ser informados')
            }
            if (name.length < 4) {
                throw new InvalidName();
            }

            if (!email.includes("@")) {
                throw new InvalidEmail();
            }

            if (password.length < 6) {
                throw new InvalidPassword();
            }

            const id: string = idGenerator.generateId()

            const hashPassword: string = await hashManager.generateHash(password)

            if (role.toUpperCase() != UserRole.ADMIN && role.toUpperCase() != UserRole.NORMAL) {
                throw new InvaliRole();
            }
            const user: user = {
                id,
                name,
                email,
                password: hashPassword,
                role
            }
            await userDatabase.insertUser(user);

            const token = tokenGenerator.generateToken({ id, role })
            return token

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }
    };

    // LOGIN

    public login = async (input: LoginInputDTO): Promise<string> => {
        try {
            const { email, password } = input;

            if (!email || !password) {
                throw new CustomError(400, 'Preencha os campos "email" e "password"');
            }

            if (!email.includes("@")) {
                throw new InvalidEmail();
            }

            const user = await userDatabase.findUser(email);

            if (!user) {
                throw new UserNotFound()
            }

            const compareResult: boolean = await hashManager.compareHash(password, user.password)

            if (!compareResult) {
                throw new InvalidPassword()
            }

            const token = tokenGenerator.generateToken({ id: user.id, role: user.role })

            return token
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    //BUSC PERFIL POR ID

    public getProfile = async (input: InputProfileDTO): Promise<string> => {

        try {
            const { token } = input

            if (!token) {
                throw new CustomError(400, 'Informe o token');
            }

            const data = tokenGenerator.tokenData(token)

            if (!data.id) {
                throw new Unauthorized()
            }

            return await userDatabase.getProfile(data.id);

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    };

    //BUSCA USUARIO POR ID

    public getUser = async (id: string, input: InputProfileDTO) => {

        try {
            const { token } = input

            if (!token) {
                throw new CustomError(400, 'Informe o token');
            }

            const data = tokenGenerator.tokenData(token)

            if (!data.id) {
                throw new Unauthorized()
            }

            await userDatabase.getUser(data.id);

            const userSelected = await userDatabase.getUser(id)

            if (!userSelected[0]) {
                throw new UserNotFound
            }

            const result = {
                id: userSelected[0].id,
                name: userSelected[0].name,
                email: userSelected[0].email,
            }
            return userSelected;

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }
    }

    //CRIAR AMIZADE 

    public createFriendship = async (input: FriendInputDTO) => {
        try {
            const { friendId } = input

            const idFriend = await userDatabase.findFriend(input);

            if (!friendId) {
                throw new CustomError(400, 'Informar ID dos amigos')
            }

            if (idFriend) {
                throw new CustomError(400, 'Já é seu amigo!')
            }

            const id: string = idGenerator.generateId()

            const friend: friend = {
                id,
                friendId
            }
            await userDatabase.insertFriend(friend);
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }
    };

    // DESFAZ AMIZADE

    public deleteFriend = async (inputToken: InputProfileDTO, input: DelFriendDTO): Promise<void> => {

        try {
            const { token } = inputToken

            if (!token) {
                throw new CustomError(400, 'Informe o token');
            }

            const data = tokenGenerator.tokenData(token)

            if (!data.id) {
                throw new Unauthorized()
            }

            const { friendId } = input

            const idFriend = await userDatabase.findFriend(input);

            if (!idFriend) {
                throw new CustomError(401, 'Você não tem esta amizade!')
            }

            if (!friendId) {
                throw new CustomError(400, 'Informar ID a ser excluída')
            }
            const friend: delFriend = {
                friendId
            }

            await userDatabase.deleteFriend(friend);
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }
    };

    // BUSCA TODOS OS USUARIOS

    public getAllUsers = async () => {
        try {
            return await userDatabase.getAllUsers();

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    //BUSCA FEED

    public getFeed = async (input: InputFeedDTO) => {
        try {
            const { token } = input

            if (!token) {
                throw new CustomError(400, 'Informe o token');
            }

            const data = tokenGenerator.tokenData(token)

            if (!data.id) {
                throw new Unauthorized()
            }

            const userSelected = await userDatabase.getUser(data.id)

            const recipeSelected = await recipeDatabase.getRecipe(data.id)

            if (!userSelected[0]) {
                throw new UserNotFound
            }

            const result = {
                recipe: recipeSelected,
                userId: userSelected[0].id,
                userName: userSelected[0].name,

            }
            return result

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    };

}