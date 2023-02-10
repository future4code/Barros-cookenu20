import { Request, Response } from "express";
import { FriendBusiness } from "../business/FriendBusiness";
import { FriendDatabase } from "../data/mySQL/FriendDatabase";
import { DelFriendDTO, FriendInputDTO } from "../model/friend";

const friendBusiness = new FriendBusiness
const friendDatabase = new FriendDatabase

export class FriendController {

    public createFriendship = async (req: Request, res: Response) => {
    try {
      const { friendId } = req.params;

      const input: FriendInputDTO = {

        friendId
      };

      await friendBusiness.createFriendship(input);

      res.status(201).send({ message: "Amizade criada!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }

  };

  public deleteFriendship = async (req: Request, res: Response) => {
    try {
      const { friendId } = req.params;

      const input: DelFriendDTO = {
        friendId
      };

      await friendBusiness.deleteFriend(input);
      res.status(201).send({ message: "Amizade desfeita!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  //BUSCA POST DE AMIGOS

  public getAllFriends = async (req: Request, res: Response): Promise<void> => {

    try {
      const id = req.params.id
      console.log(id)

      const posts = await friendBusiness.getAllFriends()

      res.status(201).send(posts)
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

}
