import { createStore } from 'tinybase';

class DatabaseService {
    constructor() {
        this.store = createStore();
        this.store.setTablesSchema({
        recipe: {
            id: { type: 'number' },
            category: { type: 'string' },
            name: { type: 'string' },
            ingredients: { type: 'string' },
            preparation: { type: 'string' }, 
            notice: { type: 'string' },
        },
        category: {
            id: { type: 'number' },
            name: { type: 'string' },
            url: { type: 'string' }
        },
    });}

    
    createRecipe(category, name, ingredients, preparation, notice) {
        this.store.setRow('recipe', 'recipe1', { 
                        id: '1', 
                        category: category, 
                        name: name, 
                        ingredients: ingredients, 
                        preparation: preparation, 
                        notice: notice });
    }

    getRecipe() {
        return this.store.getRow('recipe', 'recipe1');
    }
}


export default DatabaseService;
// export { createRecipe };