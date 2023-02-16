import { recipe } from "../model/recipe";

export interface RecipeRepository {
    insertRecipe(recipe: recipe): unknown;
    getRecipe(id: string): Promise<recipe[]>
    getAllRecipes(): Promise<recipe[]>
}