import express from "express";
import { FriendBusiness } from "../../business/FriendBusiness";
import { FriendDatabase } from "../../data/mySQL/FriendDatabase";
import { FriendController } from "../FriendController";

export const friendRouter = express.Router()

const friendDatabase  = new FriendDatabase()

const friendBusiness = new FriendBusiness()

const friendController = new FriendController(friendBusiness)

friendRouter.post('/create', friendController.createFriendship)

friendRouter.delete('/delete', friendController.deleteFriendship)

friendRouter.get("/getAll",friendController.getAllFriends)

