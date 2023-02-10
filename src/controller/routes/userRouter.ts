import express from "express";
import { UserBusiness } from "../../business/UserBusiness";
import { UserDatabase } from "../../data/mySQL/UserDatabase";
import { UserController } from "../UserController";

export const userRouter = express.Router()

const userDatabase  = new UserDatabase()

const userBusiness = new UserBusiness()

const userController = new UserController()

userRouter.get("/getAll",userController.getUsers)

userRouter.post('/signup', userController.createUser)

userRouter.get("/login",userController.login)

userRouter.get("/profile",userController.getProfile)
