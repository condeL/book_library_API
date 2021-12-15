/*
* books_controller.js
* Handles the requests from the server
 */

const Books = require("../models/books_model")
const {errorMsg} = require("./error_msg");

class BooksController {
    /*
    *@desc Get all book IDs and titles
    *@route GET: /api/books
    */
    async getAllBooks(req, res) {
        try {
            // get the books
            const books = await new Books().findAllBooks();

            // set the status code, and content-type
            res.writeHead(200, {"Content-Type": "application/json"});
            // send the data
            for (let book of books) {
                res.write(`ID: ${book.id} Title: ${book.title}\n`);
            }
            res.end();
        } catch (error) {
            errorMsg(res, error);
        }
    }

    /*
    *@desc Get all the pages in a book
    *@route GET: /api/books/:book_id
    */
    async getBookInfo(req, res, book_id) {
        try {
            // get book by id
            const book = await new Books().findBookById(book_id);

            // set the status code and content-type
            res.writeHead(200, {"Content-Type": "application/json"});

            // send the data
            for (let page in book.pages) {
                page++;
                res.write(`Page: ${page}\n`);
            }
            res.end();

        } catch (error) {
            errorMsg(res, error)

        }
    }

    /*
    *@desc Create a single book
    *@route POST: /api/books
    */
    async postBook(req, res, book) {
        try {
            const result = await new Books().createBook(book);

            // set the status code and content-type
            res.writeHead(200, {"Content-Type": "application/json"});
            // send the data
            res.end(result);

        } catch (error) {
            errorMsg(res, error);
        }
    }



    /*
    *@desc Update a book's title
    *@route PUT: /api/books/:book_id
    */
    async putBookTitle(req, res, book_id, book_title) {
        try {
            const book = await new Books().updateBookTitle(book_id, book_title);

            // set the status code and content-type
            res.writeHead(200, {"Content-Type": "application/json"});
            // send the data
            res.end(book);

        } catch (error) {
            errorMsg(res, error);
        }
    }

    /*
    *@desc Delete a single book
    *@route DELETE: /api/books/:book_id
    */
    async deleteBook(req, res, book_id) {
        try {
            const book = await new Books().removeBook(book_id);

            // set the status code and content-type
            res.writeHead(200, {"Content-Type": "application/json"});
            // send the data
            res.end(book);

        } catch (error) {
            errorMsg(res, error);
        }
    }

}

module.exports = BooksController;