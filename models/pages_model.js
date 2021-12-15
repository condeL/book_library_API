/*
* pages_model.js
* Maps the data to the database for manipulation
 */

const data = require("../data/books_DB.json");
const fs = require('fs');

class PagesModel{
    // @desc Retrieves a single page using the book and page id
    async findPageById(book_id, page_id) {
        return new Promise((resolve, reject) => {
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

    // @desc Creates a book page
    async createPage(book_id, page_update) {
        return new Promise((resolve, reject) => {
            // get the book
            let book = data.find((book) => book.id === parseInt(book_id));

            if (book) {
                //create a new page
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

    // @desc Updates a book page
    async updatePage(book_id, page_id, page_update) {
        return new Promise((resolve, reject) => {
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

    // @desc deletes a book page
    async removePage(book_id, page_id) {
        return new Promise((resolve, reject) => {
            let book = data.find((book) => book.id === parseInt(book_id));

            if (book) {
                let page = book.pages[page_id - 1];
                if(page) {

                    try {
                        //delete the page;
                        book.pages.splice(page_id-1, 1);
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

module.exports = PagesModel;