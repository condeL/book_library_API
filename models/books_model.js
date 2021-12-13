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
            // get the book
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

    // @desc Creates a new book
    async createBook(book) {
        // creates a new book
        return new Promise((resolve, reject) => {
            book.id = data.length + 1;
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

    // @desc Creates a book page
    async createBookPage(book_id, page_update) {
        return new Promise((resolve, reject) => {
            // get the book
            let book = data.find((book) => book.id === parseInt(book_id));

            if (book) {
                //create a new page
                page_update.page_id = book.pages.length+1;
                //todo add input validation
                book.pages.push(page_update);
                let books_DB = JSON.stringify(data, null, 4);

                try {
                    //write to the DB
                    fs.writeFile('./data/books_DB.json', books_DB, () => {
                        resolve(JSON.stringify(page_update, null, 4));
                    });
                } catch (error) {
                    reject(JSON.stringify(error));
                }
            }
            else {
                // return an error
                reject(`Book with id ${book_id} not found `);
            }
        });
    }

    // @desc Updates book title
    async updateBookTitle(book_id, book_title) {
        return new Promise((resolve, reject) => {
            // get the book
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

    // @desc Updates a book page
    async updateBookPage(book_id, page_id, page_update) {
        return new Promise((resolve, reject) => {
            // get the page to update
            let book = data.find((book) => book.id === parseInt(book_id));

            if (book) {
                    let page = book.pages[page_id - 1];
                    if (page) {
                        //update the page
                        page.html = page_update.html;
                        let books_DB = JSON.stringify(data, null, 4);
                        try {
                            //write to the DB
                            fs.writeFile('./data/books_DB.json', books_DB, () => {
                                resolve(JSON.stringify(page_update, null, 4));
                            });
                        } catch (error) {
                            reject(JSON.stringify(error));
                        }
                    } else {
                        // return an error
                        reject(`Page ${page_id} not found`);
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
            // get the book
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
                        console.log(error);
                        reject(JSON.stringify(error));
                    }

            } else {
                // return an error
                reject(`Book with id ${book_id} not found `);
            }
        });
    }

    // @desc deletes a book page
    async removeBookPage(book_id, page_id) {
        // creates a new book
        return new Promise((resolve, reject) => {
            // get the book
            let book = data.find((book) => book.id === parseInt(book_id));

            if (book) {
                let page = book.pages[page_id - 1];
                if(page) {
                    //let page_index = data.map((b) => b.id).indexOf(parseInt(book_id));

                        try {
                            //delete the page;
                            book.pages.splice(page_id-1, 1);
                            let books_DB = JSON.stringify(data, null, 4);

                            //write to the DB
                            fs.writeFile('./data/books_DB.json', books_DB, () => {
                                resolve();
                            });

                        } catch (error) {
                            console.log(error);
                            reject(JSON.stringify(error));
                        }
                } else {
                    // return an error
                    reject(`Page ${page_id} not found`);

                }
            }
            else {
                // return an error
                reject(`Book with id ${book_id} not found `);
            }
        });
    }
}

module.exports = BooksModel;