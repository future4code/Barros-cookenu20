import { CustomError } from "../../error/customError";
import { recipe } from "../../model/recipe";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {

    //CRIA RECEITA

    public insertRecipe = async (recipe: recipe): Promise<void> => {
        try {
            await RecipeDatabase.connection
                .insert({
                    id: recipe.id,
                    title: recipe.title,
                    description: recipe.description,
                    created_at: recipe.createdAt,
                    author_id: recipe.authorId
                })
                .into("cookenu_recipes");
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };

    //BUSCA RECEITA POR ID

    public getRecipe = async (idRecipe: string): Promise<recipe[]> => {
        try {
            const recipe = await RecipeDatabase.connection
                .select("id", "title", "description", "created_at")
                .from("cookenu_recipes")
                .where("author_id", idRecipe)
                .orderBy("created_at", "desc")
            return recipe;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };

    //BUSCA TODOS AS RECEITAS

    public getAllRecipes = async (): Promise<recipe[]> => {
        try {
            const allRecipes = await RecipeDatabase.connection
                .select()
                .from("cookenu_recipes")
            return allRecipes;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };

}
