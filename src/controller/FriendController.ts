import { Request, Response } from "express";
import { FriendBusiness } from "../business/FriendBusiness";
import { DelFriendDTO, FriendInputDTO } from "../model/friend";

export class FriendController {

  constructor(private friendBusiness: FriendBusiness) { }

  public createFriendship = async (req: Request, res: Response) => {
    try {
      const { friendId } = req.body;

      const input: FriendInputDTO = {

        friendId
      };

      await this.friendBusiness.createFriendship(input);

      res.status(201).send({ message: "Amizade criada!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }

  };

  public deleteFriendship = async (req: Request, res: Response) => {
    try {
      const { friendId } = req.body;

      const input: DelFriendDTO = {
        friendId
      };

      await this.friendBusiness.deleteFriend(input);
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

      const posts = await this.friendBusiness.getAllFriends()

      res.status(201).send(posts)
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

}
