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

Book.prototype = {
    createCard() {
        const bookInfoContainer = document.createElement('div');
        const readerInfoContainer = document.createElement('div');

        const bookImg = document.createElement('img');
        const bookCard = document.createElement('div');
        const bookTitle = document.createElement('h2');
        const bookAuthor = document.createElement('h4');

        const bookPagesContainer = document.createElement('div');
        const bookPagesTitle = document.createElement('p');
        const bookPages = document.createElement('p');

        const bookStatusContainer = document.createElement('div');
        const bookStatusTitle = document.createElement('p');
        const bookStatus = document.createElement('p');

        const bookEditBtn = document.createElement('button');

        bookImg.src = this.src;
        bookTitle.textContent = this.name;
        bookAuthor.textContent = this.author;

        bookPagesTitle.textContent = 'Pages:';
        bookPages.textContent = this.pages;

        bookStatusTitle.textContent = 'Status:';
        bookStatus.textContent = this.status;

        bookEditBtn.textContent = 'Edit';
        
        bookCard.id = this.id;
        bookCard.classList.add('book__card');
        bookInfoContainer.classList.add('book__info');
        readerInfoContainer.classList.add('reader__info');
        bookEditBtn.classList.add('edit__btn');

        bookInfoContainer.append(bookTitle, bookAuthor);
        bookPagesContainer.append(bookPagesTitle, bookPages);
        bookStatusContainer.append(bookStatusTitle, bookStatus);
        readerInfoContainer.append(bookPagesContainer, bookStatusContainer);

        bookCard.append(bookImg, bookInfoContainer, readerInfoContainer, bookEditBtn);

        mainDisplay.appendChild(bookCard);
    }
}

const addBook = function addBookToTheLibrary(src, name, author, pages, status) {
    const newBook = new Book(src, name, `by ${author}`, `${pages} pages`, status);
    myLibrary.push(newBook);
}

const displayBooks = function displayBooksToTheLibrary() {
    myLibrary.forEach((book) => {
        book.createCard();
    });

}

addBook('./hobbit.jpg','Joker','Joker', 635, 'not read');
addBook('./hobbit.jpg','Batman','Batman', 255, 'read');
addBook('./hobbit.jpg','Batman','Batman', 255, 'read');


displayBooks();