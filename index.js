/*
* index.js
* Starts the server and does the routing
 */

const http = require("http");
const PORT = process.env.PORT || 8080;
const BooksController = require("./controllers/books_controller");
const PagesController = require("./controllers/pages_controller");
const {noRouteFound} = require("./controllers/error_msg");


const server = http.createServer(async (req, res) => {
    //set request route
    const url = req.url;

    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();

    // /api/books/:book_id/page/:page_id/html : GET
    if (url.match(/\/api\/books\/(\d+)\/page\/(\d+)\/html$/) && req.method === "GET") {
        // get ids from url
        const book_id = req.url.split("/")[3];
        const page_id = req.url.split("/")[5];

        await new PagesController().getPage(req, res, book_id, page_id);
    }
    // /api/books/:book_id : GET
    else if (url.match(/\/api\/books\/(\d+$)/) && req.method === "GET") {
        // get id from url
        const book_id = req.url.split("/")[3];

        await new BooksController().getBookInfo(req, res, book_id);
    }
    // /api/books : GET
    else if (url === "/api/books" && req.method === "GET") {
        await new BooksController().getAllBooks(req, res);
    }
    // /api/books/:book_id/page : POST
    else if (url.match(/\/api\/books\/(\d+)\/page/) && req.method === "POST") {
        // get book id from url
        const book_id = req.url.split("/")[3];
        await new PagesController().postPage(req, res, book_id, JSON.parse(data));
    }
    // /api/books :POST
    else if (url === "/api/books" && req.method === "POST") {
        await new BooksController().postBook(req, res, JSON.parse(data));
    }
    // /api/books/:book_id/page/:page_id : PUT
    else if (url.match(/\/api\/books\/(\d+)\/page\/(\d+$)/) && req.method === "PUT") {
        // get book and page id from url
        const book_id = req.url.split("/")[3];
        const page_id = req.url.split("/")[5];
        await new PagesController().putPage(req, res, book_id, page_id, JSON.parse(data));
    }
    // /api/books/:book_id : PUT
    else if (url.match(/\/api\/books\/(\d+$)/) && req.method === "PUT") {
        // get id from url
        const book_id = req.url.split("/")[3];
        await new BooksController().putBookTitle(req, res, book_id, JSON.parse(data).title);
    }
    // /api/books/:book_id/page/:page_id : DELETE
    else if (url.match(/\/api\/books\/(\d+)\/page\/(\d+$)/) && req.method === "DELETE") {
        // get book and page id from url
        const book_id = req.url.split("/")[3];
        const page_id = req.url.split("/")[5];
        await new PagesController().deletePage(req, res, book_id, page_id);
    }
    // /api/books/:book_id : DELETE
    else if (url.match(/\/api\/books\/(\d+$)/) && req.method === "DELETE") {
        // get id from url
        const book_id = req.url.split("/")[3];
        await new BooksController().deleteBook(req, res, book_id);
    }
    // No route present
    else {
        await noRouteFound(req, res);
    }
});

//start server
server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});