/*
* books_model.js
* Maps the data to the database for manipulation
 */

const data = require("../data/books_DB.json");

class BooksModel {
    // @desc Retrieves all the books
    async findBooks() {
        // return all books
        return new Promise((resolve, _) => resolve(data));
    }
    // @desc Retrieves a single book using its id
    async findBookById(id) {
        return new Promise((resolve, reject) => {
            // get the book
            let book = data.find((book) => book.id === parseInt(id));
            if (book) {
                // return the book
                resolve(book);
            } else {
                // return an error
                reject(`Book with id ${id} not found `);
            }
        });
    }
    // @desc Retrieves a single page using the book and page id
    async findPageById(book_id, page_id) {
        return new Promise((resolve, reject) => {
            // get the page
            let book = data.find((book) => book.id === parseInt(book_id));
            if (book) {
                let page = book.pages[page_id-1];
                if(page) {
                    // return the page
                    resolve(page);
                }
                else{
                    // return an error
                    reject(`Page ${page_id} not found`);
                }
            } else {
                // return an error
                reject(`Book with id ${book_id} not found`);
            }
        });
    }
}

module.exports = BooksModel;