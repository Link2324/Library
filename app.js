"use strict"

const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info = function () {
        return `${title} by ${author}, ${pages} pages, ${this.read}`;
    }
}

myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkein", 204, true));
myLibrary.push(new Book("The Lord of the Rings", "J.R.R Tolkein", 500, false));

const cardWrapper = document.querySelector('.card-wrapper');

function displayBooks() {
    let i = 0;
    for (const book of myLibrary) {
        cardWrapper.innerHTML +=
            `<div class="card" card-index=${i}>
               <span class="delete">&#10006</span>
               <div class="title">Title: ${book.title}</div>
               <div class="author">Author: ${book.author}</div>
               <div class="pages">Pages: ${book.pages}</div>
               <div>
                 <label for="${i}">Read</label>
                 <input type="checkbox" name="read" id="${i}" ${book.read ? 'checked' : ''}>
               </div>
            </div>`;
        i++;
    }
}

function clearDisplay() {
    cardWrapper.innerHTML = '';
}

function addBookToLibrary() {
    // do stuff here
    const title = document.querySelector('#book-title');
    const author = document.querySelector('#book-author');
    const pages = Number(document.querySelector('#book-pages').value);
    const read = document.querySelector('#book-read');
    myLibrary.push(new Book(title.value, author.value, pages, read.checked));
}

const addBook = document.querySelector('#add-book');
const modal = document.querySelector('dialog');
const closeModal = document.querySelector('#close');

closeModal.addEventListener('click', e => {
    modal.close();
})

addBook.addEventListener('click', (e) => {
    modal.showModal();
})

const submit = document.querySelector('#submit');
submit.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary();
    clearDisplay();
    displayBooks();
})

cardWrapper.addEventListener('click', (e) => {
    if (e.target.className === "delete") {
        const parentCard = e.target.parentNode;
        const cardIndex = parentCard.getAttribute("card-index");
        myLibrary.splice(cardIndex, 1);
        clearDisplay();
        displayBooks();
    };
})

displayBooks();
