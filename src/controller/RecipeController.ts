import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { RecipeInputDTO } from "../model/recipe";

export class RecipeController {

  constructor(private recipeBusiness: RecipeBusiness) { }

  //CRIA RECEITA

  public createRecipe = async (req: Request, res: Response) => {
    try {
      const { title, description, createdAt, authorId } = req.body;

      const input: RecipeInputDTO = {
        title,
        description,
        createdAt,
        authorId,
      };

      await this.recipeBusiness.createRecipe(input);
      
      res.status(201).send(`Receita cadastrada: ${(input.title)} - ${(input.description)}`);
    } catch (error: any) {
      res.status(400).send(error.message);
    }

  };

  //BUSCA RECEITA POR ID

  public getRecipe = async (req: Request, res: Response): Promise<void> => {

    try {
      const id = req.params.id

      const recipes = await this.recipeBusiness.getRecipe(id)

      res.status(201).send(recipes)
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  //BUSCA RECEITAS DE AMIGOS

  public getAllRecipes = async (req: Request, res: Response): Promise<void> => {

    try {
      const id = req.params.id

      const recipes = await this.recipeBusiness.getAllRecipes()

      res.status(201).send(recipes)
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }
}
