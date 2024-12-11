import { createStore } from 'tinybase';
import { Recipe } from './modells/Recipe';
import { Category } from './modells/Category';
import * as SQLite from 'expo-sqlite';
import SQLiteService from '../database_elements/SQLiteService';

const sqliteService = new SQLiteService();

const RECIPE = 'recipe';
const CATEGORY = 'category';

class DatabaseService {
    constructor() {
        if (DatabaseService.instance) {
            return DatabaseService.instance;
        }
        this.store = createStore().setTablesSchema({
        recipe: {
            category: { type: 'string' },
            name: { type: 'string' },
            ingredients: { type: 'string' },
            instructions: { type: 'string' }, 
            notice: { type: 'string' },
            dish: {type: 'string'},
            isLiked: { type: 'string' }
        },
        category: {
            name: { type: 'string' },
            url: { type: 'string' }
        },
    })
    DatabaseService.instance = this}
    
    createRecipe(category, name, ingredients, instructions, notice, dish) {
        this.store.setRow(RECIPE, name, { 
                        name: name,
                        category: category, 
                        ingredients: ingredients, 
                        instructions: instructions, 
                        notice: notice,
                        dish: dish,
                        isLiked: 'false' });

        sqliteService.createRecipe(category, name, ingredients, instructions, notice, dish);
    }

    updateLike(name) {
        console.log('updateLike');
        const data = this.store.getRow(RECIPE, name);
        this.store.setRow(RECIPE, name, {
            name: data.name,
            category: data.category,
            ingredients: data.ingredients,
            instructions: data.instructions,
            notice: data.notice,
            isLiked: data.isLiked === 'true' ? 'false' : 'true'
        });
    }

    updateRecipe(nameOld, nameNew, categoryNew, ingredientsNew, instructionsNew, noticeNew) {
        const data = this.store.getRow(RECIPE, nameOld);
        this.store.setRow(RECIPE, nameOld, {
            name: nameNew,
            category: categoryNew,
            ingredients: ingredientsNew,
            instructions: instructionsNew,
            notice: noticeNew,
            isLiked: data.isLiked
        });

    }

    getRecipe(value) {
        const data = this.store.getRow(RECIPE, value);
        const recipe = new Recipe(data.name, data.category, data.ingredients, data.instructions, data.notice, data.dish, data.isLiked);
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
                data.notice,
                data.isLiked
            )
        );

        return allRecipes;
    }

    getRecipesByCategory(category) {
        const rowData = this.store.getTable(RECIPE);
        const recipes = Object.values(rowData).filter(data => data.category === category).map(data =>
            new Recipe(
                data.name,
                data.category,
                data.ingredients,
                data.instructions,
                data.notice,
                data.isLiked
            ) 
        );
        
        return recipes;
    }

    createCategory(name, url) {
        this.store.setRow(CATEGORY, name, {
                        name: name,
                        url: url });
        sqliteService.createCategory(name, url);
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

    initializeDefaultCategories() {
        // this.store.setRow(CATEGORY, name, {
        //     name: name,
        //     url: url });

        this.createCategory('Soup', '1')
        this.createCategory('Main Dish', '2')
        this.createCategory('Dessert', '3')
        this.createCategory('Try Later', '4')
    }

    generateTestRecipes() {
        // const testRecipes = [
        //     { category: "Soup", name: "Tomato Soup", ingredients: "Tomatoes, Water, Salt, Pepper", instructions: "Boil and blend.", notice: "Serve hot." },
        //     { category: "Main Dish", name: "Grilled Chicken", ingredients: "Chicken, Spices, Olive Oil", instructions: "Grill until golden brown.", notice: "Ensure internal temp is 165°F." },
        //     { category: "Dessert", name: "Chocolate Cake", ingredients: "Flour, Cocoa, Sugar, Eggs", instructions: "Mix and bake at 350°F.", notice: "Cool before serving." },
        //     { category: "Dessert", name: "Pancakes", ingredients: "Flour, Milk, Eggs, Syrup", instructions: "Cook on a hot skillet.", notice: "Flip when bubbly." },
        //     { category: "Try Later", name: "Nachos", ingredients: "Tortilla Chips, Cheese, Jalapeños", instructions: "Bake until cheese melts.", notice: "Serve with salsa." },
        //     { category: "Soup", name: "Minestrone", ingredients: "Vegetables, Pasta, Beans", instructions: "Simmer for 30 minutes.", notice: "Season to taste." },
        //     { category: "Main Dish", name: "Spaghetti Bolognese", ingredients: "Spaghetti, Ground Beef, Tomato Sauce", instructions: "Cook and mix sauce.", notice: "Top with parmesan." },
        //     { category: "Dessert", name: "Ice Cream Sundae", ingredients: "Ice Cream, Chocolate Syrup, Nuts", instructions: "Layer in a bowl.", notice: "Add whipped cream." },
        //     { category: "Try Later", name: "Omelette", ingredients: "Eggs, Cheese, Vegetables", instructions: "Whisk and cook.", notice: "Fold before serving." },
        //     { category: "Try Later", name: "Popcorn", ingredients: "Corn Kernels, Butter, Salt", instructions: "Pop in a pan.", notice: "Avoid burning." },
        //     { category: "Soup", name: "Chicken Noodle Soup", ingredients: "Chicken, Noodles, Broth", instructions: "Simmer until cooked.", notice: "Add parsley for garnish." },
        //     { category: "Main Dish", name: "Beef Stew", ingredients: "Beef, Carrots, Potatoes", instructions: "Cook on low heat.", notice: "Perfect for cold days." },
        //     { category: "Dessert", name: "Apple Pie", ingredients: "Apples, Sugar, Cinnamon, Dough", instructions: "Bake until crust is golden.", notice: "Let cool before slicing." },
        //     { category: "Try Later", name: "Avocado Toast", ingredients: "Bread, Avocado, Salt, Pepper", instructions: "Toast and spread avocado.", notice: "Top with chili flakes." },
        //     { category: "Main Dish", name: "Hummus and Veggies", ingredients: "Chickpeas, Olive Oil, Veggies", instructions: "Blend and serve with veggies.", notice: "Drizzle olive oil on top." },
        //     { category: "Soup", name: "Clam Chowder", ingredients: "Clams, Potatoes, Cream", instructions: "Simmer until creamy.", notice: "Serve with crackers." },
        //     { category: "Main Dish", name: "Salmon Fillet", ingredients: "Salmon, Lemon, Dill", instructions: "Bake for 15 minutes.", notice: "Serve with lemon wedges." },
        //     { category: "Dessert", name: "Brownies", ingredients: "Chocolate, Butter, Sugar, Flour", instructions: "Bake at 350°F.", notice: "Let cool before cutting." },
        //     { category: "Try Later", name: "Smoothie Bowl", ingredients: "Fruits, Yogurt, Granola", instructions: "Blend and top with granola.", notice: "Serve chilled." },
        //     { category: "Dessert", name: "Cheese Platter", ingredients: "Cheese, Crackers, Fruits", instructions: "Arrange on a platter.", notice: "Pair with wine." },
        // ];
        // testRecipes.forEach(recipe => {
        //     this.createRecipe(recipe.category, recipe.name, recipe.ingredients, recipe.instructions, recipe.notice);
        // });
    }

    async getAllRecipesFromSQLDatabase() {
        try {
            const sqliteRecipes = await sqliteService.getAllRecipes();
    
            sqliteRecipes.forEach(recipe => {
                console.log(recipe);
                console.log('\n');
                this.createDefaultRecipe(recipe.category, recipe.name, recipe.ingredients, recipe.instructions, recipe.notice, recipe.isLiked);
                this.store.setRow(RECIPE, recipe.name, {
                    category: recipe.category,
                    name: recipe.name,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions,
                    notice: recipe.notice,
                    isLiked: recipe.isLiked
                });
            });
            console.log('Recipes synchronized from SQLite to TinyBase.');
        } catch (error) {
            console.error('Error synchronizing recipes:', error);
        }
    }

    createDefaultCategory(name, url) {
        this.store.setRow(CATEGORY, name, {
            name: name,
            url: url });
    }

    createDefaultRecipe(category, name, ingredients, instructions, notice, dish, isLiked) {
        this.store.setRow(RECIPE, name, {
            category: category,
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            notice: notice,
            dish: dish,
            isLiked: 'false'
        });
    }
    
    async syncCategoriesFromSQLite() {
        try {
            const sqliteCategories = await sqliteService.getAllCategories();
    
            sqliteCategories.forEach(category => {
                this.createDefaultCategory(category.name, category.url);
                this.store.setRow(CATEGORY, category.name, {
                    name: category.name,
                    url: category.url
                });
            });
            console.log('Categories synchronized from SQLite to TinyBase.');
        } catch (error) {
            console.error('Error synchronizing categories:', error);
        }
    }    
}

export default DatabaseService;