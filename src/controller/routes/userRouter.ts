import express from "express";
import { AddressInfo } from "net";
import { UserBusiness } from "../../business/UserBusiness";
import { RecipeDatabase } from "../../data/mySQL/RecipeDatabase";
import { UserDatabase } from "../../data/mySQL/UserDatabase";
import { app } from "../app";
import { UserController } from "../UserController";


export const userRouter = express.Router()

const userDatabase  = new UserDatabase()

const userBusiness = new UserBusiness()

const userController = new UserController()

const recipeDatabase  = new RecipeDatabase()

userRouter.post("/signup", userController.createUser)

userRouter.post("/follow", userController.createFriendship)

userRouter.get("/feed", userController.getFeed)

userRouter.get("/login",userController.login)

userRouter.get("/profile",userController.getProfile)

userRouter.get("/getAll",userController.getAllUsers)

userRouter.get("/:id",userController.getUser)

userRouter.delete("/unfollow", userController.deleteFriendship)

