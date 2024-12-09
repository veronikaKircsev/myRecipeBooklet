import * as SQLite from 'expo-sqlite';

import { Recipe } from './modells/Recipe';
import { Category } from './modells/Category';

const RECIPE = 'recipe';
const CATEGORY = 'category';

class DatabaseService {
  constructor() {
    this.db = null;
    this.initDatabase();
  }

  /**
   * Öffnet die SQLite-Datenbank und initialisiert die Tabellen
   */
  async initDatabase() {
    try {

      this.db = await SQLite.openDatabaseAsync('databaseName');
      
      // Tabellen und Testdaten erstellen
      await this.db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS recipe (
          id INTEGER PRIMARY KEY NOT NULL,
          category TEXT NOT NULL,
          name TEXT NOT NULL,
          ingredients TEXT NOT NULL,
          instructions TEXT NOT NULL,
          notice TEXT NOT NULL,
          dish TEXT NOT NULL
        );
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish) VALUES ('Meat', 'Ground round', 'meat ingredients', 'meat instructions', 'meat notice', 'meat dish');
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish) VALUES ('Fish', 'Shark', 'fish ingredients', 'fish instructions', 'fish notice', 'fish dish');
        INSERT INTO recipe (category, name, ingredients, instructions, notice, dish) VALUES ('Salad', 'Cesar salad', 'salad ingredients', 'salad instructions', 'salad notice', 'salad dish');
      
        CREATE TABLE IF NOT EXISTS category (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          url TEXT NOT NULL
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

  /**
   * Fügt einen neuen Eintrag in die Tabelle ein
   * @param {string} value - Textwert
   * @param {number} intValue - Numerischer Wert
   * @returns {Promise<number>} - Die ID des eingefügten Eintrags
   */
  async insertRecipe(category, name, ingredients, instructions, notice, dish) {
    try {
      const result = await this.db.runAsync(
        'INSERT INTO recipe (category, name, ingredients, instructions, notice, dish) VALUES (?, ?, ?, ?, ?, ?)',
        category,
        name,
        ingredients,
        instructions,
        notice, 
        dish
      );
      return result.lastInsertRowId; // ID des neuen Eintrags
    } catch (error) {
      console.error('Error inserting test data:', error);
    }
  }

  /**
   * Aktualisiert einen Eintrag in der Tabelle
   * @param {number} intValue - Neuer numerischer Wert
   * @param {string} value - Textwert zur Identifikation
   */
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

  /**
   * Löscht einen Eintrag aus der Tabelle
   * @param {string} value - Textwert zur Identifikation
   */
  async deleteTest(value) {
    try {
      await this.db.runAsync('DELETE FROM test WHERE value = $value', {
        $value: value,
      });
    } catch (error) {
      console.error('Error deleting test data:', error);
    }
  }

  /**
   * Holt den ersten Eintrag aus der Tabelle
   * @returns {Promise<Object>} - Der erste Eintrag
   */
  async getFirstRecipe() {
    try {
      const firstRow = await this.db.getFirstAsync('SELECT * FROM recipe');
      return firstRow; // { id, value, intValue }
    } catch (error) {
      console.error('Error fetching first test row:', error);
    }
  }

  /**
   * Holt alle Einträge aus der Tabelle
   * @returns {Promise<Array>} - Alle Einträge
   */
  async getAllRecipes() {
    try {
      const allRows = await this.db.getAllAsync('SELECT * FROM recipe');
      return allRows; // [{ id, value, intValue }, ...]
    } catch (error) {
      console.error('Error fetching all test rows:', error);
    }
  }

  async getAllCategories() {
    try {
        const rowData = await this.db.getAllAsync('SELECT * FROM category');
        console.log("rowData: " + JSON.stringify(rowData));

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


  /**
   * Iteriert über alle Einträge in der Tabelle
   * @param {Function} callback - Callback für jeden Eintrag
   */
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

export default DatabaseService;
