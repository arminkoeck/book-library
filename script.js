

const myLibrary = [];


function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

const book1 = new Book("Hola", "Mr. Hola1", 201, false);
const book2 = new Book("Hola2", "Mr. Hola2", 202, true);
const book3 = new Book("Hola3", "Mr. Hola3", 203, false);
myLibrary.push(book1, book2, book3)


function addBookToLibrary() {
    const bookTitle = window.prompt("Add a new book");
    const bookAuthor = window.prompt("Add the author of the book");
    const bookPages = window.prompt("Anzahl der Seiten");
    const bookRead = window.prompt("Gelesen");
    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
    myLibrary.push(newBook);
}

function displayBooks () {
    const table = document.getElementById("table");
    const tableBody = document.createElement("tbody");

    for (let i=0; i < myLibrary.length; i++) {
        const tableRow = document.createElement("tr");

        for (let property in myLibrary[i]) {
            const tableCell = document.createElement("td");
            tableCell.textContent = myLibrary[i][property];
            tableRow.appendChild(tableCell);
        };

        tableBody.appendChild(tableRow);
    };

    table.appendChild(tableBody);
}

displayBooks();

/*
Create form
prevent submit button default Action
when button is clicked,let function input the form information into variables
create function that uses these variables to create a new object.
use the title of the book as constant name so that the newly created object has the name of the title
push the book object into the array


*/