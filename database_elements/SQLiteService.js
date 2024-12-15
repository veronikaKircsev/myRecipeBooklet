import * as SQLite from 'expo-sqlite';

import { Recipe } from './modells/Recipe';
import { Category } from './modells/Category';

const RECIPE = 'recipe';
const CATEGORY = 'category';

class SQLiteService {
  constructor() {
      if (SQLiteService.instance) {
        return SQLiteService.instance;
      }
    this.db = null;
    this.initDatabase();
    SQLiteService.instance = this;
  }

  async initDatabase() {
    try {

      this.db = await SQLite.openDatabaseAsync('databaseName');
      
      // DROP TABLE IF EXISTS recipe;
      // DROP TABLE IF EXISTS category;
      await this.db.execAsync(`

        DROP TABLE IF EXISTS recipe;
        DROP TABLE IF EXISTS category;
        
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS recipe (
          id INTEGER PRIMARY KEY NOT NULL,
          category TEXT NOT NULL,
          name TEXT NOT NULL,
          ingredients TEXT,
          instructions TEXT,
          notice TEXT,
          dish TEXT,
          isLiked TEXT
        );
        
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Soup', 'Tomato Soup', 'Tomatoes, Water, Salt, Pepper', 'Boil and blend.', 'Serve hot.', '', '');
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Main Dish', 'Grilled Chicken', 'Chicken, Spices, Olive Oil', 'Grill until golden brown.', 'Ensure internal temp is 165°F.', '', '');
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Dessert', 'Chocolate Cake', 'Flour, Cocoa, Sugar, Eggs', 'Mix and bake at 350°F.', 'Cool before serving.', '', '');
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Dessert', 'Pancakes', 'Flour, Milk, Eggs, Syrup', 'Cook on a hot skillet.', 'Flip when bubbly.', '', '');
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Try Later', 'Nachos', 'Tortilla Chips, Cheese, Jalapeños', 'Bake until cheese melts.', 'Serve with salsa.', '', '' );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Soup', 'Minestrone', 'Vegetables, Pasta, Beans', 'Simmer for 30 minutes.', 'Season to taste.', '', '' );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Main Dish', 'Spaghetti Bolognese', 'Spaghetti, Ground Beef, Tomato Sauce', 'Cook and mix sauce.', 'Top with parmesan.', '', '' );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Dessert', 'Ice Cream Sundae', 'Ice Cream, Chocolate Syrup, Nuts', 'Layer in a bowl.', 'Add whipped cream.', '', '' );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Try Later', 'Omelette', 'Eggs, Cheese, Vegetables', 'Whisk and cook.', 'Fold before serving.', '', '' );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Try Later', 'Popcorn', 'Corn Kernels, Butter, Salt', 'Pop in a pan.', 'Avoid burning.', '', '' );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Soup', 'Chicken Noodle Soup', 'Chicken, Noodles, Broth', 'Simmer until cooked.', 'Add parsley for garnish.', '', '' );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Main Dish', 'Beef Stew', 'Beef, Carrots, Potatoes', 'Cook on low heat.', 'Perfect for cold days.', '', '' );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Dessert', 'Apple Pie', 'Apples, Sugar, Cinnamon, Dough', 'Bake until crust is golden.', 'Let cool before slicing.', '', '' );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Try Later', 'Avocado Toast', 'Bread, Avocado, Salt, Pepper', 'Toast and spread avocado.', 'Top with chili flakes.', '', '' );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Main Dish', 'Hummus and Veggies', 'Chickpeas, Olive Oil, Veggies', 'Blend and serve with veggies.', 'Drizzle olive oil on top.', '', '' );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Soup', 'Clam Chowder', 'Clams, Potatoes, Cream', 'Simmer until creamy.', 'Serve with crackers.', '', '' );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Main Dish', 'Salmon Fillet', 'Salmon, Lemon, Dill', 'Bake for 15 minutes.', 'Serve with lemon wedges.', '', '' );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Dessert', 'Brownies', 'Chocolate, Butter, Sugar, Flour', 'Bake at 350°F.', 'Let cool before cutting.', '', '' );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Try Later', 'Smoothie Bowl', 'Fruits, Yogurt, Granola', 'Blend and top with granola.', 'Serve chilled.', '', '' );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES ('Dessert', 'Cheese Platter', 'Cheese, Crackers, Fruits', 'Arrange on a platter.', 'Pair with wine.', '', '' );
        
        CREATE TABLE IF NOT EXISTS category (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          url TEXT
        );
        INSERT INTO category (name, url) VALUES ('Soup', '1');
        INSERT INTO category (name, url) VALUES ('Main Dish', '2');
        INSERT INTO category (name, url) VALUES ('Dessert', '3');
        INSERT INTO category (name, url) VALUES ('Try Later', '4');
        `);

    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  async createRecipe(category, name, ingredients, instructions, notice, dish, isLiked = false) {
    try {
      const result = await this.db.runAsync(
        'INSERT INTO recipe (category, name, ingredients, instructions, notice, dish, isLiked) VALUES (?, ?, ?, ?, ?, ?, ?)',
        category,
        name,
        ingredients,
        instructions,
        notice, 
        dish,
        isLiked ? 'true' : 'false'
      );
    } catch (error) {
      console.error('Error inserting recipe data:', error);
    }
  }

  async createCategory(name, url) {
    try {
      const result = await this.db.runAsync(
        'INSERT INTO category (name, url) VALUES (?, ?)',
        name,
        url
      );
      console.log("SQLiteService.js createCategory(): " + result.lastInsertRowId);
    } catch (error) {
      console.error('Error inserting category data:', error);
    }
  }

  async updateTest(intValue, value) {
    try {
      await this.db.runAsync(
        'UPDATE test SET intValue = ? WHERE value = ?',
        intValue,
        value
      );
    } catch (error) {
      console.error('Error updating test data:', error);
    }
  }

  async deleteTest(value) {
    try {
      await this.db.runAsync('DELETE FROM test WHERE value = $value', {
        $value: value,
      });
    } catch (error) {
      console.error('Error deleting test data:', error);
    }
  }

  async getFirstRecipe() {
    try {
      const firstRow = await this.db.getFirstAsync('SELECT * FROM recipe');
      return firstRow; // { id, value, intValue }
    } catch (error) {
      console.error('Error fetching first test row:', error);
    }
  }

  async getAllRecipes() {
    try {
      const allRows = await this.db.getAllAsync('SELECT * FROM recipe'); 
      const allRecipes = allRows.map(data =>
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
    } catch (error) {
      console.error('Error fetching all test rows:', error);
    }
  }

  async getAllCategories() {
    try {
        const rowData = await this.db.getAllAsync('SELECT * FROM category');

        if (!rowData || rowData.length === 0 || rowData === null) {
            console.warn('No categories found in the database.');
            return []; 
        }

        const allCategories = rowData.map(data =>
            new Category(
                data.name,
                data.url
            )
        );
        return allCategories;
    } catch (error) {
        console.error('Error fetching all category rows:', error);
    }
}

async getCategory(value) {
    try {
        const rowData = await this.db.getAllAsync('SELECT * FROM category where name = $value', {
            $value: value,
        });
        const category = new Category(rowData.name, rowData.url);
        return category;
    } catch(error) {
        console.error('Error fetching category row:', error);
    }
}

async iterateTests(callback) {
    try {
      for await (const row of this.db.getEachAsync('SELECT * FROM test')) {
        callback(row); // { id, value, intValue }
      }
    } catch (error) {
      console.error('Error iterating test rows:', error);
    }
  }
}

export default SQLiteService;