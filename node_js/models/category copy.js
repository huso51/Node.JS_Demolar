const mysql = require('../utility/database');

module.exports = class Category {
    constructor(name, description) {
        this.id = (categories.length + 1).toString();
        this.name = name;
        this.description = description;
    }

    saveCategory() {
        //categories.push(this);
        return mysql.execute('insert into categories(name, description) values(?, ?)',[this.name, this.description]);
    }

    static getAll() {
        //return categories;
        return mysql.execute('select * from categories;');
    }

    static getById(id) {
        //return categories.find(i => i.id === id);
        return mysql.execute('select * from categories where id=?',[id]);
    }

    static update(category) {
        /*const index = categories.findIndex(i => i.id === categories.id);
        categories[index].name = category.name;
        categories[index].description = category.description;*/
        return mysql.execute('update categories set categories.name=?, categories.descripiton=?',[category.name, category.description]);
    }

    static deleteById(id) {
        /**const index = categories.findIndex(i => i.id === categories.id);
        categories.slice(index, 1);*/
        return mysql.execute('delete from categories where id=?',[id]);
    }
}