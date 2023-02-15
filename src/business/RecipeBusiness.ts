import { RecipeDatabase } from "../data/mySQL/RecipeDatabase";
import { CustomError, RecipeNotFound, Unauthorized } from "../error/customError";
import { InputRecipeDTO, recipe, RecipeInputDTO } from "../model/recipe";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const idGenerator = new IdGenerator()
const tokenGenerator = new TokenGenerator()
const recipeDatabase = new RecipeDatabase();
const hashManager = new HashManager()


export class RecipeBusiness {
   
//CRIA RECEITA

  public createRecipe = async (input: RecipeInputDTO) => {
    try {
      let message = "Success!"

      const {title, description, createdAt, authorId} = input
          
      const data = tokenGenerator.tokenData(authorId)
      
      const id: string = idGenerator.generateId()
      
      const recipe:recipe = {
            id,            
            title,
            description,
            createdAt,
            authorId:data.id
           }
           
      await recipeDatabase.insertRecipe(recipe)
  } catch (error:any) {
      throw new CustomError(error.statusCode, error.message)
   }
  };

//BUSCA RECEITA POR ID

  public getRecipe = async (id: string, input:InputRecipeDTO) => {

      try {
        const {token} = input
    
        if (!token) {
          throw new CustomError(400, 'Informe o token');
      }
    
      const data = tokenGenerator.tokenData(token)
    
      if (!data.id) {
          throw new Unauthorized()
      }
      
      await recipeDatabase.getRecipe(data.id); 

      const recipeSelected = await recipeDatabase.getRecipe(id)
      
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

 public getAllRecipes = async (input:InputRecipeDTO) => {

    try {      
      const {token} = input
    
      if (!token) {
        throw new CustomError(400, 'Informe o token');
    }
  
    const data = tokenGenerator.tokenData(token)
  
    if (!data.id) {
        throw new Unauthorized()
    }
    
    await recipeDatabase.getRecipe(data.id); 
    return await recipeDatabase.getAllRecipes()
  
  } catch (error: any) {
     throw new CustomError(error.statusCode, error.message)
  
      }
    }

}