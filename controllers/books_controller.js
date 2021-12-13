/*
* books_controller.js
* Handles the requests from the server
 */

const Books = require("../models/books_model")

class BooksController {
    /*
    *@desc Lists all book IDs and titles
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
    *@desc Lists all the pages in a book
    *@route GET: /api/books/:id
    */
    async getBookInfo(req, res, book_id) {
        try {
            // get book by id
            const book = await new Books().findBookById(book_id);

            // set the status code and content-type
            res.writeHead(200, {"Content-Type": "application/json"});

            // send the data
            for (let page of book.pages) {
                res.write(`Page: ${page.page_id}\n`);
            }
            res.end();

        } catch (error) {
            errorMsg(res, error)

        }
    }

    /*
    *@desc Gets a single book page in HTML format
    *@route GET: /api/books/:book_id/page/:page_id/html
    */
    async getBookPage(req, res, book_id, page_id) {
        try {
            //get page
            const page = await new Books().findPageById(book_id, page_id);

            // set the status code and content-type
            res.writeHead(200, {"Content-Type": "text/html"});
            // send the data
            res.end(page.html);

        } catch (error) {
            errorMsg(res, error);
        }
    }

    /*
    *@desc Creates a single book
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
    *@desc Creates a new page
    *@route POST: /api/books/:book_id/page
    */
    async postBookPage(req, res, book_id, page_update) {
        try {
            const book = await new Books().createBookPage(book_id, page_update);

            // set the status code and content-type
            res.writeHead(200, {"Content-Type": "application/json"});
            // send the data
            res.end(book);

        } catch (error) {
            errorMsg(res, error);
        }
    }

    /*
    *@desc Updates a single book's title
    *@route PUT: /api/books/:id
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
    *@desc Updates a single book's page
    *@route PUT: /api/books/:book_id/page/:page_id
    */
    async putBookPage(req, res, book_id, page_id, page_update) {
        try {
            const book = await new Books().updateBookPage(book_id, page_id, page_update);

            // set the status code and content-type
            res.writeHead(200, {"Content-Type": "application/json"});
            // send the data
            res.end(book);

        } catch (error) {
            errorMsg(res, error);
        }
    }


    /*
    *@desc Deletes a single book
    *@route PUT: /api/books/:id
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

    /*
    *@desc Updates a single book's page
    *@route DELETE: /api/books/:book_id/page/:page_id
    */
    async deleteBookPage(req, res, book_id, page_id) {
        try {
            const book = await new Books().removeBookPage(book_id, page_id);

            // set the status code and content-type
            res.writeHead(200, {"Content-Type": "application/json"});
            // send the data
            res.end(book);

        } catch (error) {
            errorMsg(res, error);
        }
    }

    /*
    *@desc Displays error message when no route is found
    */
    async noRouteFound(req, res) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message: "Route not found"}));
    }
}

//error message printer
function errorMsg(res, error){
    res.writeHead(404, {"Content-Type": "application/json"})
    res.end(error);
}

module.exports = BooksController;