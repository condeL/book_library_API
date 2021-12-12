/*
* seeder.js
* Loads the database with initial data
 */

const fs = require('fs');

const books_DB = [
    {
        "id": 1,
        "title": "Book 1",
        "pages": [
            {
                "page_id": 1,
                "html": "Hello World"
            },
            {
                "page_id": 2,
                "html": "Hello World 2"
            }
        ]
    },
    {
        "id": 2,
        "title": "Book 2",
        "pages": [
            {
                "page_id": 1,
                "html": "Hello World"
            },
            {
                "page_id": 2,
                "html": "Hello World 2"
            },
            {
                "page_id": 3,
                "html": "Hello World 3"
            }
        ]
    },
    {
        "id": 3,
        "title": "Book 3",
        "pages": [
            {
                "page_id": 1,
                "html": "Hello World"
            },
            {
                "page_id": 2,
                "html": "Hello World 2"
            }
        ]
    },
    {
        "id": 4,
        "title": "Book 4",
        "pages": [
            {
                "page_id": 1,
                "html": "Hello World"
            },
            {
                "page_id": 2,
                "html": "Hello World 2"
            },
            {
                "page_id": 3,
                "html": "Hello World 3"
            },
            {
                "page_id": 4,
                "html": "Hello World 4"
            }
        ]
    }
];

const data = JSON.stringify(books_DB, null, 4);

//create and write the database JSON file
fs.writeFile('./data/books_DB.json', data, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Database seeded!");
});