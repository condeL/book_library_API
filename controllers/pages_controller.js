/*
* pages_controller.js
* Handles the requests from the server
 */

const Pages = require("../models/pages_model");
const {errorMsg} = require("./error_msg");


class Pages_controller{
    /*
    *@desc Gets a single book page in HTML format
    *@route GET: /api/books/:book_id/page/:page_id/html
    */
    async getPage(req, res, book_id, page_id) {
        try {
            //get page
            const page = await new Pages().findPageById(book_id, page_id);

            // set the status code and content-type
            res.writeHead(200, {"Content-Type": "text/html"});
            // send the data
            res.end(page.html);

        } catch (error) {
            errorMsg(res, error);
        }
    }

    /*
    *@desc Creates a new page for a book
    *@route POST: /api/books/:book_id/page
    */
    async postPage(req, res, book_id, page_update) {
        try {
            const book = await new Pages().createPage(book_id, page_update);

            // set the status code and content-type
            res.writeHead(200, {"Content-Type": "application/json"});
            // send the data
            res.end(book);

        } catch (error) {
            errorMsg(res, error);
        }
    }

    /*
    *@desc Updates a book page
    *@route PUT: /api/books/:book_id/page/:page_id
    */
    async putPage(req, res, book_id, page_id, page_update) {
        try {
            const book = await new Pages().updatePage(book_id, page_id, page_update);

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
    async deletePage(req, res, book_id, page_id) {
        try {
            const book = await new Pages().removePage(book_id, page_id);

            // set the status code and content-type
            res.writeHead(200, {"Content-Type": "application/json"});
            // send the data
            res.end(book);

        } catch (error) {
            errorMsg(res, error);
        }
    }
}

module.exports = Pages_controller;