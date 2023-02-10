import { CustomError, RecipeNotFound } from "../error/customError";
import { recipe, RecipeInputDTO } from "../model/recipe";
import { RecipeRepository } from "./RecipeRepository";

export class RecipeBusiness {

  constructor(private recipeDatabase:RecipeRepository) {}

   
//CRIA RECEITA

  public createRecipe = async (input: RecipeInputDTO) => {
    try {
      let message = "Success!"

      const {title, description, createdAt, authorId} = input

      const recipeId: string = Date.now().toString()
      
      const recipe:recipe = {
            id:recipeId,            
            title,
            description,
            createdAt,
            authorId
           }
           
      await this.recipeDatabase.insertRecipe(recipe)
  } catch (error:any) {
      throw new CustomError(error.statusCode, error.message)
   }
  };

//BUSCA RECEITA POR ID

  public getRecipe = async (id: string) => {

      try {      
    
      const recipeSelected = await this.recipeDatabase.getRecipe(id)
      
      if(!recipeSelected[0]){
        throw new RecipeNotFound
      }

      const result = {
        id:recipeSelected[0].id,
        title:recipeSelected[0].title,
        description:recipeSelected[0].description,
        createdAt:recipeSelected[0].createdAt,
        authorId:recipeSelected[0].authorId,
      }
      return recipeSelected;
       
    } catch (error: any) {
       throw new CustomError(error.statusCode, error.message)

    }
 }

//BUSCA TODOS OS POSTS

 public getAllRecipes = async () => {

    try {      
    return await this.recipeDatabase.getAllRecipes()
  
  } catch (error: any) {
     throw new CustomError(error.statusCode, error.message)
  
      }
    }

}