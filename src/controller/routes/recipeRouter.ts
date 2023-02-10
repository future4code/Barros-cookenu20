import express from "express";
import { RecipeBusiness } from "../../business/RecipeBusiness";
import { RecipeDatabase } from "../../data/mySQL/RecipeDatabase";
import { RecipeController } from "../RecipeController";


export const recipeRouter = express.Router()

const recipeDatabase  = new RecipeDatabase()

const recipeBusiness = new RecipeBusiness()

const recipeController = new RecipeController()

recipeRouter.get("/getAll",recipeController.getAllRecipes)

recipeRouter.get("/get/:id",recipeController.getRecipe)

recipeRouter.post('/', recipeController.createRecipe)

