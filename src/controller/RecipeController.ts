import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { RecipeInputDTO } from "../model/recipe";
import { InputProfileDTO } from "../model/user";


const recipeBusiness = new RecipeBusiness();

export class RecipeController {

  //constructor(private recipeBusiness: RecipeBusiness) { }

  //CRIA RECEITA

  public createRecipe = async (req: Request, res: Response) => {
    try {
      const { title, description, createdAt, authorId } = req.body;

      const idUser : InputProfileDTO = {
        token: req.headers.authorization as string
        }

      const input: RecipeInputDTO = {
        title,
        description,
        createdAt,
        authorId:idUser.token,
      };

      await recipeBusiness.createRecipe(input);
      
      res.status(201).send(`Receita cadastrada: ${(input.title)} - ${(input.description)}`);
    } catch (error: any) {
      res.status(400).send(error.message);
    }

  };

  //BUSCA RECEITA POR ID

  public getRecipe = async (req: Request, res: Response): Promise<void> => {

    try {
      const id = req.params.id
      const input : InputProfileDTO = {
        token: req.headers.authorization as string
        }

      const recipes = await recipeBusiness.getRecipe(id,input)

      res.status(201).send(recipes)
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  //BUSCA TODAS AS RECEITAS

  public getAllRecipes = async (req: Request, res: Response): Promise<void> => {

    try {
     // const id = req.params.id

      const input : InputProfileDTO = {
        token: req.headers.authorization as string
        }
      const recipes = await recipeBusiness.getAllRecipes(input)

      res.status(201).send(recipes)
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  
}
