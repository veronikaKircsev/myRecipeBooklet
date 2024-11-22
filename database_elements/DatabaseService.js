import { createStore } from 'tinybase';
import { Recipe } from './Recipe';
import { Category } from './Category';

const RECIPE = 'recipe';
const CATEGORY = 'category';

class DatabaseService {
    constructor() {
        this.store = createStore();
        this.store.setTablesSchema({
        recipe: {
            category: { type: 'string' },
            name: { type: 'string' },
            ingredients: { type: 'string' },
            instructions: { type: 'string' }, 
            notice: { type: 'string' },
        },
        category: {
            name: { type: 'string' },
            url: { type: 'string' }
        },
    });}
    
    createRecipe(category, name, ingredients, instructions, notice) {
        this.store.setRow(RECIPE, name, { 
                        name: name,
                        category: category, 
                        ingredients: ingredients, 
                        instructions: instructions, 
                        notice: notice });
    }

    getRecipe(value) {
        const data = this.store.getRow(RECIPE, value);

        const recipe = new Recipe(data.name, data.category, data.ingredients, data.instructions, data.notice);

        return recipe;
    }

    getAllRecipes() {
        const rowData = this.store.getTable(RECIPE);

        const allRecipes = Object.values(rowData).map(data =>
            new Recipe(
                data.name,
                data.category,
                data.ingredients,
                data.instructions,
                data.notice
            )
        );

        return allRecipes;
    }

    createCategory(name, url) {
        this.store.setRow(CATEGORY, name, { 
                        name: name,
                        url: url });
    }

    getCategory(value) {
        const data = this.store.getRow(CATEGORY, value);

        const category = new Category(data.name, data.url);

        return category;
    }

    getAllCategories() {
        const rowData = this.store.getTable(CATEGORY);

        const allCategories = Object.values(rowData).map(data =>
            new Category(
                data.name,
                data.url
            )
        );

        return allCategories;
    }
}

export default DatabaseService;