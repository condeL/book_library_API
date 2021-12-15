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
                "html": "Hello World"
            },
            {
                "html": "Hello World 2"
            }
        ]
    },
    {
        "id": 2,
        "title": "Book 2",
        "pages": [
            {
                "html": "Book 2 page 1"
            },
            {
                "html": "Book 2 page 2"
            },
            {
                "html": "Book 2 page 3"
            }
        ]
    },
    {
        "id": 3,
        "title": "Book 3",
        "pages": [
            {
                "html": "Book 3 page 1"
            },
            {
                "html": "Book 3 page 2"
            }
        ]
    },
    {
        "id": 4,
        "title": "Book 4",
        "pages": [
            {
                "html": "Book 4 page 1"
            },
            {
                "html": "Book 4 page 2"
            },
            {
                "html": "Book 4 page 3"
            },
            {
                "html": "Book 4 page 4"
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