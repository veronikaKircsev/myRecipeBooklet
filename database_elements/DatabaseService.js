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
        const data = this.store.getRow(RECIPE, name);
        if (data.isLiked === undefined) {
            data.isLiked = 'false';
        }
        this.store.setRow(RECIPE, name, {
            name: data.name,
            category: data.category,
            ingredients: data.ingredients,
            instructions: data.instructions,
            notice: data.notice,
            dish: data.dish,
            isLiked: data.isLiked === 'false' ? 'true' : 'false'
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
                data.dish,
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
                this.createDefaultRecipe(recipe.category, recipe.name, recipe.ingredients, recipe.instructions, recipe.notice, recipe.isLiked, recipe.dish);
                this.store.setRow(RECIPE, recipe.name, {
                    category: recipe.category,
                    name: recipe.name,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions,
                    notice: recipe.notice,
                    dish: recipe.dish,
                    isLiked: recipe.isLiked
                });
            });
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
        } catch (error) {
            console.error('Error synchronizing categories:', error);
        }
    }   

    shootDown() {
        const data = this.store.getTable(RECIPE);
        const data2 = this.store.getTable(CATEGORY);
        for (let i = 0; i < data.length; i++) {
            sqliteService.createRecipe(data[i].category, data[i].name, data[i].ingredients, data[i].instructions, data[i].notice, data[i].dish, data[i].isLiked);
        }
        for (let i = 0; i < data2.length; i++) {
            sqliteService.createCategory(data2[i].name, data2[i].url);
        }
    }


    
    getCategoryIcons() {
        const ImageList = [
            { id: '1', 'url': require('../assets/categoryIcons/soup.png') },
            { id: '2', 'url': require('../assets/categoryIcons/mainCourse.png') },
            { id: '3', 'url': require('../assets/categoryIcons/mignons.png') },
            { id: '4', 'url': require('../assets/categoryIcons/notes.png') },
            { id: '5', 'url': require('../assets/categoryIcons/2.png') },
            { id: '6', 'url': require('../assets/categoryIcons/3.png') },
            { id: '7', 'url': require('../assets/categoryIcons/4.png') },
            { id: '8', 'url': require('../assets/categoryIcons/5.png') },
            { id: '9', 'url': require('../assets/categoryIcons/6.png') },
            { id: '10', 'url': require('../assets/categoryIcons/7.png') },
            { id: '11', 'url': require('../assets/categoryIcons/8.png') },
            { id: '12', 'url': require('../assets/categoryIcons/9.png') },
            { id: '13', 'url': require('../assets/categoryIcons/10.png') },
            { id: '14', 'url': require('../assets/categoryIcons/11.png') },
            { id: '15', 'url': require('../assets/categoryIcons/12.png') },
            { id: '16', 'url': require('../assets/categoryIcons/13.png') },
            { id: '17', 'url': require('../assets/categoryIcons/14.png') },
            { id: '18', 'url': require('../assets/categoryIcons/15.png') },
            { id: '19', 'url': require('../assets/categoryIcons/16.png') },
            { id: '20', 'url': require('../assets/categoryIcons/17.png') },
            { id: '22', 'url': require('../assets/categoryIcons/19.png') },
            { id: '23', 'url': require('../assets/categoryIcons/20.png') },
            { id: '24', 'url': require('../assets/categoryIcons/21.png') },
            { id: '25', 'url': require('../assets/categoryIcons/22.png') },
            { id: '26', 'url': require('../assets/categoryIcons/23.png') },
            { id: '27', 'url': require('../assets/categoryIcons/24.png') },
            { id: '28', 'url': require('../assets/categoryIcons/25.png') },
            { id: '29', 'url': require('../assets/categoryIcons/26.png') },
            { id: '30', 'url': require('../assets/categoryIcons/27.png') },
            { id: '31', 'url': require('../assets/categoryIcons/28.png') },
            { id: '32', 'url': require('../assets/categoryIcons/29.png') },
            { id: '33', 'url': require('../assets/categoryIcons/30.png') },
            { id: '34', 'url': require('../assets/categoryIcons/31.png') },
            { id: '35', 'url': require('../assets/categoryIcons/32.png') },
            { id: '36', 'url': require('../assets/categoryIcons/33.png') },
            { id: '37', 'url': require('../assets/categoryIcons/34.png') },
            { id: '38', 'url': require('../assets/categoryIcons/35.png') },
            { id: '39', 'url': require('../assets/categoryIcons/36.png') },
            { id: '40', 'url': require('../assets/categoryIcons/37.png') },
            { id: '41', 'url': require('../assets/categoryIcons/38.png') },
            { id: '42', 'url': require('../assets/categoryIcons/39.png') },
            { id: '43', 'url': require('../assets/categoryIcons/40.png') },
            { id: '45', 'url': require('../assets/categoryIcons/42.png') },
            { id: '46', 'url': require('../assets/categoryIcons/43.png') },
        
        ];
        return ImageList;
    }
        
}

export default DatabaseService;