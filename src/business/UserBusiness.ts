import { UserDatabase } from "../data/mySQL/UserDatabase";
import { CustomError, InvalidEmail, InvalidName, InvalidPassword, Unauthorized, UserNotFound } from "../error/customError";
import { InputProfileDTO, LoginInputDTO, user, UserInputDTO } from "../model/user";
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
  // public getAllUsers = async () => {
  //   try {
  //     return await userDatabase.getAllUsers();

  //   } catch (error: any) {
  //     throw new CustomError(error.statusCode, error.message)
  //   }
  // }

}