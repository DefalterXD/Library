const mainDisplay = document.querySelector('.main__container');
const myLibrary = []

const Book = function(src, name, author, pages, status) {
    if(!new.target) {
        throw Error("Use 'new' to create an object");
    }
    this.src = src;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

const addBook = function addBookToTheLibrary(src, name, author, pages, status) {
    const newBook = new Book(src, name, author, `${pages} pages`, status);
    myLibrary.push(newBook);
}
