import { FriendDatabase } from "../data/mySQL/FriendDatabase";
import { CustomError, UserNotFound } from "../error/customError";
import { delFriend, DelFriendDTO, friend, FriendInputDTO } from "../model/friend";

const friendDatabase = new FriendDatabase();

export class FriendBusiness {

  public createFriendship = async (input: FriendInputDTO) => {
    try {
      let message = "Success!"
      const { friendId } = input

      const idFriend = await friendDatabase.findFriend(input);

      if (!friendId) {
        throw new CustomError(400, 'Informar ID dos amigos')
      }

      if (idFriend) {
        throw new CustomError(400, 'Já é seu amigo!')
      }

      const id: string = Date.now().toString()

      const friend: friend = {
        id,
        friendId
      }
      await friendDatabase.insertFriend(friend);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)

    }
  };

  public deleteFriend = async (input: DelFriendDTO): Promise<void> => {

    try {
      let message = "Success!"

      const { friendId } = input

      const idFriend = await friendDatabase.findFriend(input);

      if (!idFriend) {
        throw new CustomError(401, 'Você não tem esta amizade!')
      }

      if (!friendId) {
        throw new CustomError(400, 'Informar ID a ser excluída')
      }
      const friend: delFriend = {
        friendId
      }

      await friendDatabase.deleteFriend(friend);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)

    }
  };

  //BUSCA TODOS OS AMIGOS

  public getAllFriends = async () => {

    try {
      return await friendDatabase.getAllFriends()

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)

    }
  }

}
