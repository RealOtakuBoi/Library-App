// BOOK CONTRUCTOR

class Book {
    constructor(title,author,pages){
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}

// UI CLASS

class UI {
    static displayBooks(){
        const StoredBooks = [
            {
                title:'A Song of Ice And Fire',
                author:'George RR Martin',
                pages:'3715'
            },
            {
                title:'Harry Potter And The Phillosopher`s Stone',
                author:'JK Rowlings',
                pages:'2563'
            }
        ];
        
        const books = StoredBooks;
        books.forEach((book) => {
            UI.addBookToList(book);
        });
    }

    static addBookToList(book){
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");

        row.innerHTML = 
        `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }
};





// DISPLAYING BOOKS

document.addEventListener("DOMContentLoaded", UI.displayBooks)