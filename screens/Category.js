export class Category {

    constructor(name, url) {
        this.name = name;
        this.url = url;
    }    

    setName(value) {
        this.name = value;
    }

    getName() {
        return this.name;
    }

    setUrl(value) {
        this.url = value;
    }

    getUrl() {
        return this.url;
    }

    toString() {
        return "name = " + this.name + ", URL = "+ this.url;
    }
}