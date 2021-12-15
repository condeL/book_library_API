# Vanilla NodeJS Library REST API

## Setup Instructions

- Run `npm install` in the command line
- Run `npm run-script seed` to create the database and initialize it with data
- Run `npm start` to start the API server

## Usage
- `POST: /api/books` Create a single book
- `POST: /api/books/:book_id/page` Create a new page for a book
- `GET: /api/books` Get all the book IDs and titles
- `GET: /api/books/:book_id` Get all the pages in a specified book
- `GET: /api/books/:book_id/page/page_id:` Get a single book page in HTML format
- `PUT: /api/books/:book_id` Update a book's title
- `PUT: /api/books/:book_id/page/:page_id` Update a book page
- `DELETE: /api/books/:book_id` Delete a book
- `DELETE: /api/books/:book_id/page/:page_id` Delete a book page
  