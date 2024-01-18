
// variables

const openButton = document.querySelector("#modal-button");
const modal = document.querySelector("#modal");
const closeButton = document.querySelector("#close-button");
const saveButton = document.querySelector("#save-button");
const myLibrary = [];



// functions

class Book {
    constructor (title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}



function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}


function displayBooks () {
    const table = document.getElementById("table");
    const tableBody = document.createElement("tbody");

    for (let i=0; i < myLibrary.length; i++) {
        const tableRow = document.createElement("tr");

        for (let property in myLibrary[i]) {

            if (property === "title" || property === "author" || property === "pages") {
                addBookProperties(i, property, tableRow)
            } else if (property === "status") {
                addStatusButton(i, property, tableRow);
            };
            
        };

        addRemoveButton(i, tableRow);
        tableBody.appendChild(tableRow);
    };

    table.appendChild(tableBody);
    changeReadStatusByClick();
    deleteBookByClick();
};


function changeReadStatusByClick() {
    const statusButtons = document.querySelectorAll(".statusButton");
    statusButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            myLibrary[e.target.dataset.row].changeStatus();
            button.textContent = myLibrary[e.target.dataset.row].status
            if (myLibrary[e.target.dataset.row].status === "READ") {
                button.classList.add("active")
            } else {
                button.classList.remove("active");
            }
            ;
        });
    });
};

function deleteBookByClick() {
    const removeButtons = document.querySelectorAll(".removeButton");
    removeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
        myLibrary.splice(e.target.dataset.row, 1);
        clearDisplay();
        displayBooks();
        });
    });
};



function addBookProperties(i, property, tableRow) {
    const tableCell = document.createElement("td");
    tableCell.textContent = myLibrary[i][property];
    tableRow.appendChild(tableCell);
}


function addRemoveButton(i, tableRow) {
    const tableCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.classList.add("removeButton")
    removeButton.dataset.row = `${[i]}`;
    removeButton.textContent = "DELETE";
    tableCell.appendChild(removeButton);
    tableRow.appendChild(tableCell);
}


function addStatusButton(i, property, tableRow,) {
    const tableCell = document.createElement("td");
    const statusButton = document.createElement("button");
    statusButton.classList.add("statusButton")
    statusButton.dataset.row = `${[i]}`;
    statusButton.textContent = myLibrary[i][property];
    tableCell.appendChild(statusButton);
    tableRow.appendChild(tableCell);
    if (myLibrary[i].status === "READ") {
        statusButton.classList.add("active");
    } else {
        statusButton.classList.remove("active");
    }
};

openButton.addEventListener("click", () => {
    modal.showModal()
});

closeButton.addEventListener("click", () => {
    modal.close()
});


function getBookInput () {
    const title = document.querySelector(".title").value;
    const author = document.querySelector(".author").value;
    const pages = document.querySelector(".pages").value;
    const status = document.querySelector(".status").checked ? "READ" : "NOT READ";
    return new Book(title, author, pages, status);
};

function resetBookInput () {
    document.querySelector(".title").value = "";
    document.querySelector(".author").value = "";
    document.querySelector(".pages").value = "";
    document.querySelector(".status").checked = false;
};

function clearDisplay () {
    const tableBody = document.querySelector("tbody");
    tableBody.remove();
};

saveButton.addEventListener("click", (e) => {
    const form = document.querySelector("#form");
    if (form.checkValidity()) {
        e.preventDefault();
        addBookToLibrary(getBookInput());
        resetBookInput();
        clearDisplay();
        displayBooks();
        modal.close();
    };
});

const statusCell = document.querySelector("td")

Book.prototype.changeStatus = function() {
    (this.status === "READ") ? this.status = "NOT READ" : this.status = "READ";
}

const dummyBook = new Book("Lord of the Rings", "John R. R. Tolkien", 1184, "READ");
myLibrary.push(dummyBook);
const dummyBook2 = new Book("Harry Potter and the Chamber of Secrets", "J. K. Rowling", 223, "NOT READ");
myLibrary.push(dummyBook2);

displayBooks();
