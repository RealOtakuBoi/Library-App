
class Book {
    constructor(title,author,pages){
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}


class UI {
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");

        row.innerHTML = 
        `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><input type="checkbox" class= "read"></td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    };

    static clearFields(){
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#pages").value = '';
    };

    static showAlert(message,className){
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div,form);
        
        setTimeout(() => document.querySelector(".alert").remove(),3000);
    }

    static bookAddedAlert(message,className){
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div,form);
        setTimeout(() => document.querySelector(".alert").remove(),3000);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
        }
    }
};




class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(pages) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.pages === pages) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  





document.addEventListener("DOMContentLoaded", UI.displayBooks);




document.querySelector("#book-form").addEventListener('submit',(e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;

    if(title == ''|| author == '' || pages == '' ){
        UI.showAlert("Kindly Fill Out all The Fields",'danger');
    }else{
        UI.bookAddedAlert("Book Added to The List",'success');
        const book = new Book(title,author,pages);
        UI.addBookToList(book);

        Store.addBook(book);

        UI.clearFields();
    }

});




document.querySelector("#book-list").addEventListener('click', (e) => {
    UI.deleteBook(e.target);


    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
});