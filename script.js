const mainDisplay = document.querySelector('.main__container');
const myLibrary = []

const Book = function(src, name, author, pages, status) {
    if(!new.target) {
        throw Error("Use 'new' to create an object");
    }
    this.id = crypto.randomUUID();
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

const displayBooks = function displayBooksToTheLibrary() {
    myLibrary.forEach((book) => {
        const bookImg = document.createElement('img');
        const bookCard = document.createElement('div');
        const bookTitle = document.createElement('h2');
        const bookAuthor = document.createElement('h3');
        const bookPages = document.createElement('p');
        const bookStatus = document.createElement('p');
        const bookEditBtn = document.createElement('button');
        const bookId = crypto.randomUUID();

        bookImg.src = book.src;
        bookTitle.textContent = book.name;
        bookAuthor.textContent = book.author;
        bookPages.textContent = book.pages;
        bookStatus.textContent = book.status;
        bookEditBtn.textContent = 'Edit';

        bookCard.classList.add('book__card')
        bookCard.id = bookId;
        bookCard.append(bookImg, bookTitle, bookAuthor, bookPages, bookStatus, bookEditBtn);
        mainDisplay.appendChild(bookCard);
    });

}

addBook('./hobbit.jpg','Joker','Joker', 635, 'not read');
addBook('./hobbit.jpg','Batman','Batman', 255, 'read');
addBook('./hobbit.jpg','Batman','Batman', 255, 'read');


displayBooks();