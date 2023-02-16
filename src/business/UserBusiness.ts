import { UserDatabase } from "../data/mySQL/UserDatabase";
import { CustomError, InvalidEmail, InvalidName, InvalidPassword, Unauthorized, UserNotFound } from "../error/customError";
import { FriendInputDTO } from "../model/friend";
import { delFriend, DelFriendDTO, friend, InputProfileDTO, LoginInputDTO, user, UserInputDTO } from "../model/user";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const idGenerator = new IdGenerator()
const tokenGenerator = new TokenGenerator()
const userDatabase = new UserDatabase();
const hashManager = new HashManager()

export class UserBusiness {
  public createUser = async (input: UserInputDTO): Promise<string> => {
    try {
      let message = "Success!"
      const { name, email, password } = input

      if (!name || !email || !password) {
        throw new CustomError(400, '"name", "email" e "password" devem ser informados')
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

      const user: user = {
        id,
        name,
        email,
        password: hashPassword
      }
      await userDatabase.insertUser(user);

      const token = tokenGenerator.generateToken(id)
      return token

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)

    }
  };

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

      const token = tokenGenerator.generateToken(user.id)

      return token
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

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

  public deleteFriend = async (inputToken:InputProfileDTO, input:DelFriendDTO): Promise<void> => {

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


  public getAllUsers = async () => {
    try {
      return await userDatabase.getAllUsers();

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

}