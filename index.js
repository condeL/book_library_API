/*
* index.js
* Starts the server and does the routing
 */

const http = require("http");
const PORT = process.env.PORT || 8080;
const BooksController = require("./controllers/books_controller");

const server = http.createServer(async (req, res) => {
    //set request route
    const url = req.url;

    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();

    // /api/books/:id/page/id:/html : GET
    if (url.match(/\/api\/books\/(\d+)\/page\/(\d+)\/html$/) && req.method === "GET") {
        // get ids from url
        const book_id = req.url.split("/")[3];
        const page_id = req.url.split("/")[5];

        await new BooksController().getBookPage(req, res, book_id, page_id);
    }
    // /api/books/:id : GET
    else if (url.match(/\/api\/books\/(\d+$)/) && req.method === "GET") {
        // get id from url
        const book_id = req.url.split("/")[3];

        await new BooksController().getBookInfo(req, res, book_id);
    }
    // /api/books : GET
    else if (url === "/api/books" && req.method === "GET") {
        await new BooksController().getAllBooks(req, res);
    }
    // /api/books :POST
    else if (url === "/api/books" && req.method === "POST") {
        await new BooksController().createBook(req, res, JSON.parse(data));
    }
    // No route present
    else {
        await new BooksController().noRouteFound(req, res);
    }
});

//start server
server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});