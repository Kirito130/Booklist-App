//Book Function
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UserInterface
class UI {
    static dispBook() {     

        const books = Store.getBooks();

        books.forEach((book) => UI.addBook(book));
    }

    static addBook(book) {
        
        const list = document.querySelector('#book-list');
        const tr = document.createElement('tr');
        tr.innerHTML= `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td id="isbn">${book.isbn}</td>
                    <td><a href="#" class="btn-x">X</a></td>`
        list.appendChild(tr);

    }

    static showAlert(message, className) {

        const cont = document.querySelector('.container');
        const form = document.querySelector('.form')
        const div = document.createElement('div');
        div.className = `newDiv ${className}`
        div.appendChild(document.createTextNode(message));
        cont.insertBefore(div, form);
        
        setTimeout(() => document.querySelector('.newDiv').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }
}

//Store to localStorage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBooks(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBooks(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event Add Book
document.addEventListener('DOMContentLoaded', UI.dispBook); 

//Get values after submit
document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if (title === "" || author === "" || isbn === "") {

        UI.showAlert('Please fill in all the details', 'fillAllDetails');

    } else {

        const book1 = new Book(title, author, isbn);

        UI.addBook(book1);

        Store.addBooks(book1);

        UI.clearFields();

        UI.showAlert('Book added Successfully', 'bookAdded');
    }
    
});

//Delete Books
const list = document.querySelector('#book-list')
list.addEventListener('click', (e) => {
    if ((e) => hasClass('.btn-x')) {

        e.preventDefault();
        
        const isbn1 = e.target.parentElement.previousElementSibling.textContent;
        Store.removeBooks(isbn1);

        e.target.parentElement.parentElement.style.display = "none";

        UI.showAlert('Book removed Successfully', 'bookDeleted');
    } 
});

