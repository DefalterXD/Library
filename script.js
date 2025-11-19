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
        bookInfoContainer.classList.add('book__info');

        const additionalInfoContainer = document.createElement('div');
        additionalInfoContainer.classList.add('reader__info');

        const bookImg = document.createElement('img');
        const bookCard = document.createElement('div');
        const bookTitle = document.createElement('h2');
        const bookAuthor = document.createElement('h4');

        const bookPagesContainer = document.createElement('div');
        bookPagesContainer.classList.add('pages_info')

        const bookPagesTitle = document.createElement('p');
        const bookPages = document.createElement('p');

        const bookStatusContainer = document.createElement('div');
        bookStatusContainer.classList.add('status__info')

        const bookStatusTitle = document.createElement('p');
        const bookStatus = document.createElement('p');

        const bookStatusBtn = document.createElement('button');
        bookStatusBtn.classList.add('status__btn');

        const bookBtnContainer = document.createElement('div');
        bookBtnContainer.classList.add('btn__container');

        const bookEditBtn = document.createElement('button');
        bookEditBtn.classList.add('edit__btn');

        const bookDeleteBtn = document.createElement('button');
        bookDeleteBtn.classList.add('delete__btn');

        bookImg.src = this.src;
        bookTitle.textContent = this.name;
        bookAuthor.textContent = this.author;

        bookPagesTitle.textContent = 'Pages:';
        bookPages.textContent = this.pages;

        bookStatusTitle.textContent = 'Status:';
        bookStatus.textContent = this.status;
        bookStatusBtn.textContent = 'Change Status';

        bookEditBtn.textContent = 'Edit';
        bookDeleteBtn.textContent = 'Delete';

        bookCard.dataset.id = this.id;
        bookCard.classList.add('book__card');

        bookInfoContainer.append(bookTitle, bookAuthor);

        bookPagesContainer.append(bookPagesTitle, bookPages);
        bookStatusContainer.append(bookStatusTitle, bookStatus);
        additionalInfoContainer.append(bookPagesContainer, bookStatusContainer, bookStatusBtn);

        bookBtnContainer.append(bookEditBtn, bookDeleteBtn);

        bookCard.append(bookImg, bookInfoContainer, additionalInfoContainer, bookBtnContainer);

        mainDisplay.appendChild(bookCard);
    },
    bookStatus(status) {
        if (status.textContent === 'not read') {
            status.textContent = 'read';
        }
        else {
            status.textContent = 'not read';
        }
    }
}

const addBook = function addBookToTheLibrary(src = 'placeholder.avif', name = 'Unknown', author = 'Unknown', pages = '0', status = false) {
    const newBook = new Book(src, name, `by ${author}`, `${pages} pages`, status);
    myLibrary.push(newBook);
    displayBooks(newBook);
}

const displayBooks = function displayBooksToTheLibrary(bookCard) {
    bookCard.createCard();
}

const deleteBooks = function deleteBooksFromTheLibrary(bookCard) {
    bookCard.remove();
}

const editBooks = function editBooksFromTheLibrary(bookCard, src, name, author, pages) {
    const bookCardImg = bookCard.querySelector('img');
    const bookCardName = bookCard.querySelector('.book__info h2');
    const bookCardAuthor = bookCard.querySelector('.book__info h4');
    const bookCardPages = bookCard.querySelector('.reader__info div').lastChild;

    bookCardImg.src = (src != '') ? src : bookCardImg.src;
    bookCardName.textContent = (name != '') ? name : bookCardName.textContent;
    bookCardAuthor.textContent = (author != '') ? `by ${author}` : bookCardAuthor.textContent;
    bookCardPages.textContent = (pages != '') ? `${pages} pages` : bookCardPages.textContent;

}

document.addEventListener('click', (event) => {
    const btnClassName = event.target.className;
    switch (btnClassName) {
        case 'add__btn':
            addBookModal.showModal();
            break;

        case 'edit__btn':
            editBookModal.showModal();
            bookCardEdit = event.target.closest('div[data-id]');
            break;

        case 'status__btn':
            const bookCardStatus = event.target.closest('div[data-id]');
            const bookStatus = event.target.previousSibling.lastChild;
            const foundedCardStatus = myLibrary.find((obj) => obj.id === bookCardStatus.dataset.id);
            foundedCardStatus.bookStatus(bookStatus);
            break;

        case 'delete__btn':
            const bookCardDelete = event.target.closest('div[data-id]');
            const foundedCardToDelete =
                myLibrary.find((obj) => obj.id === bookCardDelete.dataset.id);
            const index = myLibrary.indexOf(foundedCardToDelete);
            myLibrary.splice(index, 1);
            deleteBooks(bookCardDelete);
            break;

        case 'close__btn':
            addBookModal.close();
            editBookModal.close();
            break;

        case 'add__btn modal':
            const maxAddFormInputs = 4;
            const addBookForm =
                [...event.target.closest('#add__book').querySelectorAll('input')]
                .map((element, index) => (index === maxAddFormInputs) ? element.checked : element.value);

            if (addBookForm.includes('')) {
                addBook();
            }
            else {
                addBook(...addBookForm);
            }
            break;

        case 'edit__btn modal':
            const editBookForm =
                [...event.target.closest('#edit__book').querySelectorAll('input')]
                .map((element) => element.value);
                
            editBooks(bookCardEdit, ...editBookForm);
            break;
    }
});


addBook('https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781625587534/the-picture-of-dorian-gray-9781625587534_hr.jpg', 'The Picture of Dorian Gray', 'Oscar Wilde', 169, false);

addBook('https://m.media-amazon.com/images/I/61n8wJYJcdL._AC_UF894,1000_QL80_.jpg', 'Moby-Dick', 'Herman Melville', 635, false);

addBook('https://m.media-amazon.com/images/I/81W6BFaJJWL._AC_UF1000,1000_QL80_.jpg', 'War and Peace', 'Leo Tolstoy', 1296, false);

addBook('https://cdn11.bigcommerce.com/s-aweq463/images/stencil/1280x1280/products/59565/149905/9781774021897-l-fa6218bac4ab--1-__14131.1750685772.jpg?c=2', 'Crime and Punishment', 'Fyodor Dostoevsky', 720, false);

addBook('https://www.logobook.kz/make_nimage.php?uid=11049052', 'Fahrenheit 451', 'Ray Bradbury', 256, true);

addBook('https://cdn11.bigcommerce.com/s-yzgoj/images/stencil/1280x1280/products/2002531/2929534/apixrrx0s__92759.1626522733.jpg?c=2', 'A Clockwork Orange', 'Anthony Burgess', 240, false);