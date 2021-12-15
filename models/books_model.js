/*
* books_model.js
* Maps the data to the database for manipulation
 */

const data = require("../data/books_DB.json");
const fs = require('fs');

class BooksModel {
    // @desc Retrieves all the books
    async findAllBooks() {
        // return all books
        return new Promise((resolve, _) => resolve(data));
    }

    // @desc Retrieves a single book using its id
    async findBookById(book_id) {
        return new Promise((resolve, reject) => {
            let book = data.find((book) => book.id === parseInt(book_id));
            if (book) {
                // return the book
                resolve(book);
            } else {
                // return an error
                reject(`Book with id ${book_id} not found `);
            }
        });
    }


    // @desc Creates a new book
    async createBook(book) {
        return new Promise((resolve, reject) => {
            //increment from the last id
            book.id = data[data.length-1].id + 1;
            //todo add input validation
            data.push(book);
            let books_DB = JSON.stringify(data, null, 4);
            try {
                //write to the DB
                fs.writeFile('./data/books_DB.json', books_DB, () => {
                    resolve(JSON.stringify(book, null, 4));
                });
            } catch (error){
                reject(JSON.stringify(error));
            }
        });
    }

    // @desc Updates book title
    async updateBookTitle(book_id, book_title) {
        return new Promise((resolve, reject) => {
            let book = data.find((book) => book.id === parseInt(book_id));

            if (book) {
                //update the title
                book.title = book_title;
                let books_DB = JSON.stringify(data, null, 4);

                try {
                    //write to the DB
                    fs.writeFile('./data/books_DB.json', books_DB, () => {
                        resolve(JSON.stringify(book, null, 4));
                    });

                } catch (error){
                    reject(JSON.stringify(error));
                }
            } else {
                // return an error
                reject(`Book with id ${book_id} not found `);
            }
        });
    }



    // @desc Deletes a book
    async removeBook(book_id) {
        return new Promise((resolve, reject) => {
            let book = data.find((book) => book.id === parseInt(book_id));

            if (book) {
                let book_index = data.map((b) => b.id).indexOf(parseInt(book_id));

                    try {
                        //delete book;
                        data.splice(book_index, 1);
                        let books_DB = JSON.stringify(data, null, 4);

                        //write to the DB
                        fs.writeFile('./data/books_DB.json', books_DB, () => {
                            resolve();
                        });

                    } catch (error) {
                        // return an error
                        reject(JSON.stringify(error));
                    }

            } else {
                // return an error
                reject(`Book with id ${book_id} not found `);
            }
        });
    }

}

module.exports = BooksModel;