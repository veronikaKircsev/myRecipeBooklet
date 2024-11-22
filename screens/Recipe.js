export class Recipe {

    constructor(name, category, ingredients, instructions, notice) {
        this.name = name;
        this.category = category;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.notice = notice;
    }    

    setName(value) {
        this.name = value;
    }

    getName() {
        return this.name;
    }

    setCategory(value) {
        this.category = value;
    }

    getCategory() {
        return this.category;
    }

    setIngredients(value) {
        this.ingredients = value;
    }

    getIngredients() {
        return this.ingredients;
    }

    setInstructions(value) {
        this.instructions = value;
    }

    getInstructions() {
        return this.instructions;
    }

    setNotice(value) {
        this.notice = value;
    }

    getNotice() {
        return this.notice;
    }

    toString() {
        return "name = " + this.name + ", category = " + this.category + ", ingredients = " + this.ingredients + ", instructions = " + this.instructions + ", notice = " + this.notice;
    }
}