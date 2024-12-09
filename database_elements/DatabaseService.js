import { createStore } from 'tinybase';
import { Recipe } from './modells/Recipe';
import { Category } from './modells/Category';

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
            isLiked: { type: 'boolean' }
        },
        category: {
            name: { type: 'string' },
            url: { type: 'string' }
        },
    })

    DatabaseService.instance = this;

}

    async saveToStorage() {
        try {
            await this.persister.save();
            console.log("Daten manuell gespeichert");
        } catch (error) {
            console.error("Fehler beim manuellen Speichern:", error);
        }
    }

    async loadFromStorage() {
        try {
            await this.persister.load();
            console.log("Daten manuell geladen");
        } catch (error) {
            console.error("Fehler beim manuellen Laden:", error);
        }
    }
    
    createRecipe(category, name, ingredients, instructions, notice, dish) {
        this.store.setRow(RECIPE, name, { 
                        name: name,
                        category: category, 
                        ingredients: ingredients, 
                        instructions: instructions, 
                        notice: notice,
                        dish: dish });
    }

    getRecipe(value) {
        const data = this.store.getRow(RECIPE, value);
        const recipe = new Recipe(data.name, data.category, data.ingredients, data.instructions, data.notice, data.dish);
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
                data.dish
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
                data.notice
            ) 
        );
        
        return recipes;
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

    initializeDefaultCategories() {
        this.createCategory('Soup', '1')
        this.createCategory('Main Dish', '2')
        this.createCategory('Dessert', '3')
        this.createCategory('Try Later', '4')
    }

    // initRecipies() {
    //     this.createRecipe('Fish', 'Test', 'some Ingredients', 'some instructions', 'some notice');
    //     this.createRecipe('Meat', 'Test2', 'some Ingredients2', 'some instructions2', 'some notice2');
    //     this.createRecipe('aaa', 'aaa', 'aaa', 'aaa', 'aaa');
    //     this.createRecipe('bbb', 'bbb', 'bbb', 'bbb', 'bbb');
    //     this.createRecipe('ddd', 'ddd', 'ddd', 'ddd', 'ddd');
    //     this.createRecipe('ccc', 'ccc', 'ccc', 'ccc', 'ccc');
    // }

    updateRecipe(nameUpdate, { name, category, ingredients, instructions, notice }) {
        console.log("updateRecipe: " + name + " " + category + " " + ingredients + " " + instructions + " " + notice);
        const tableData = this.store.getTable(RECIPE);
        const rowId = Object.keys(tableData).find(key => tableData[key].name === nameUpdate);

        console.log("DatabaseService.js: " + rowId);
        
        // const rowData = this.store.getRow(RECIPE, nameUpdate);
    
        const updatedData = {
            name: name !== undefined ? name : tableData.name,
            category: category !== undefined ? category : tableData.category,
            ingredients: ingredients !== undefined ? ingredients : tableData.ingredients,
            instructions: instructions !== undefined ? instructions : tableData.instructions,
            notice: notice !== undefined ? notice : tableData.notice,
        };
    
        if(rowId) {
            this.store.setRow(RECIPE, rowId, updatedData);
        } else {
            console.warn(`Recipe with ID ${nameUpdate} has been updated.`);
        }
    }
    
    deleteRecipe(name) {
        const tableData = this.store.getTable(RECIPE);
        const rowId = Object.keys(tableData).find(key => tableData[key].name === name);

        console.log("rowId: " + rowId);
        console.log(this.getRecipe(rowId));

        if (rowId) {
            this.store.delRow(RECIPE, rowId);
        } else {
            console.warn(`Recipe with name "${name}" not found.`);
        }
    }

    deleteCategory(name) {
        const tableData = this.store.getTable(CATEGORY);
        const rowId = Object.keys(tableData).find(key => tableData[key].name === name);

        console.log("rowId: " + rowId);
        console.log(this.getCategory(rowId));

        if(rowId) {
            this.store.delRow(CATEGORY, rowId);
        } else {
            console.warn(`Category with name "${name}" not found.`);
        }
    }

    listAllRecipes() {
        const recipes = this.getAllRecipes();
        console.log("All recipes: ", recipes);
    };

    // async saveToAsyncStorage(data) {
    //     try {
    //         await AsyncStorage.setItem('myDatabase', JSON.stringify(data));
    //         console.log('Data saved to AsyncStorage');
    //     } catch (error) {
    //         console.error('Error saving data to AsyncStorage:', error);
    //     }
    // }
    
    // async loadFromAsyncStorage() {
    //     try {
    //         const jsonData = await AsyncStorage.getItem('myDatabase');
    //         if (jsonData !== null) {
    //             const data = JSON.parse(jsonData);
    //             console.log('Data loaded from AsyncStorage', data);
    //             return data;
    //         }
    //     } catch (error) {
    //         console.error('Error loading data from AsyncStorage:', error);
    //     }
    //     return null;
    // };

    // async checkData() {
    //     try {
    //         const data = await AsyncStorage.getItem('myDatabase');
    //         if (data) {
    //             console.log('Daten gefunden:', JSON.parse(data));
    //         } else {
    //             console.log('Keine Daten vorhanden.');
    //         }
    //     } catch (error) {
    //         console.error('Fehler beim Abrufen der Daten:', error);
    //     }
    // };
    
}

export default DatabaseService;