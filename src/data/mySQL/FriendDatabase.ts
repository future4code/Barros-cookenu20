import { CustomError } from "../../error/customError";
import { DelFriendDTO, friend, FriendInputDTO } from "../../model/friend";
import { BaseDatabase } from "./BaseDatabase";

export class FriendDatabase extends BaseDatabase {

  public insertFriend = async (friend: friend): Promise<void> => {
    try {
      await FriendDatabase.connection
        .insert({
          id: friend.id,
          friend: friend.friendId
        })
        .into("labook_friends");
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public findFriend = async (id: FriendInputDTO) => {
    try {
      const result = await FriendDatabase.connection("labook_friends")
        .select()
        .where("friend", id.friendId);
      return result[0];

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public deleteFriend = async (friend: DelFriendDTO): Promise<void> => {
    try {
      await FriendDatabase.connection
        .delete(friend.friendId)
        .where("friend", friend.friendId)
        .into("labook_friends")
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  //BUSCA TODOS OS AMIGOS

  public getAllFriends = async (): Promise<friend[]> => {
    try {
      const allFriends = await FriendDatabase.connection
        .select()
        .from("labook_friends")
      return allFriends;

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

}
