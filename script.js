const mainDisplay = document.querySelector('.main__container');

const addBookModal = document.querySelector('#add__book');
const editBookModal = document.querySelector('#edit__book');

let bookCardEdit = '';

const myLibrary = []

const Book = function (src, name, author, pages, status) {
    if (!new.target) {
        throw Error("Use 'new' to create an object");
    }
    this.id = crypto.randomUUID();
    this.src = src;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = (status) ? 'read' : 'not read';
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

addBook('https://i.ebayimg.com/images/g/F5sAAOSwII9mYysy/s-l1200.jpg','Joker','Joker', 635, 'not read');

addBook('https://thecomicmint.com/cdn/shop/files/STL357563_1024x.jpg?v=1738082380','Batman','Batman', 255, 'read');

addBook('./batman2.avif','Batman','Batman', 255, 'read');

addBook('https://preview.redd.it/cover-batman-issue-1-variant-cover-by-nick-dragotta-v0-5wrk8za3gdqf1.jpeg?width=1080&crop=smart&auto=webp&s=16c96b14debfdf0eb585f570a5c561b3a3a7102c','Batman','Batman', 255, 'read');

displayBooks();