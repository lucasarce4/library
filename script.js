let myLibrary = [];
let numberOfBooks = 0;

function Book() {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.read = false;
}

function addBookToLibrary(){
    const bookContainer = document.querySelector('.books');
    const book = document.createElement('div');
    book.classList.add('book');
    bookContainer.appendChild(book);
    book.dataset.bookAmount = numberOfBooks;
    createDivs();
    document.querySelector(`.title-${numberOfBooks}`).textContent = `${myLibrary[myLibrary.length-1].title}`
    maxHeight(document.querySelector(`.title-${numberOfBooks}`));
    document.querySelector(`.author-${numberOfBooks}`).textContent = `${myLibrary[myLibrary.length-1].author}`
    document.querySelector(`.year-${numberOfBooks}`).textContent = `Release year: ${myLibrary[myLibrary.length-1].year}`
    document.querySelector(`.pages-${numberOfBooks}`).textContent = `${myLibrary[myLibrary.length-1].pages} pages`
    document.querySelector(`.button-${numberOfBooks}`).textContent = `Not read`
    document.querySelector(`.button-${numberOfBooks}`).onclick = readButton();
    document.querySelector(`.closeImg-${numberOfBooks}`).src = "images/close.png"
    document.querySelector(`.closeImg-${numberOfBooks}`).onclick = removeBook();
    numberOfBooks++;
}

function maxHeight(book){
    let height = book.offsetHeight;
    if (height > 62){
        book.style.fontSize = "1.4rem"
    }
}


function addButton(){
    const button = document.querySelector('form');
    button.addEventListener('submit',function(event){
        event.preventDefault();
        myLibrary[myLibrary.length]=createBook();
        addBookToLibrary(); 
        clearForm();
        document.querySelector('#form').classList.toggle('show');
        document.querySelector('.formContainer').classList.toggle('showContainer');
        event.stopPropagation()
    })
}

function clearForm(){
    document.querySelector('[name="title"]').value = '';
    document.querySelector('[name="pages"]').value ='';
    document.querySelector('[name="author"]').value ='';
    document.querySelector('[name="year"]').value ='';
}

function createBook(){
    let test = document.querySelector('[name="title"]').value;
    test = Object.create(Book);
    const title =document.querySelector('[name="title"]').value;
    const pages =document.querySelector('[name="pages"]').value;
    const author =document.querySelector('[name="author"]').value;
    const year  = document.querySelector('[name="year"]').value;
    test.title = title;
    test.pages = pages;
    test.year = year;
    test.author = author;
    
    return test;
}

function formPopup(){
    const button = document.querySelector('#addBook');
    button.addEventListener('click',()=>{
    document.querySelector('#form').classList.toggle('show');
    document.querySelector('.formContainer').classList.toggle('showContainer');
    formPopupOutside();
    })
}
    
function formPopupOutside(){
    const formContainer = document.querySelector('.formContainer')
    formContainer.addEventListener('click', function(e){
        if(e.target !== e.currentTarget) return
        document.querySelector('.formContainer').classList.remove('showContainer');
        document.querySelector('#form').classList.remove('show');
    })
}

function createDivs(){
    const book = document.querySelector(`[data-book-amount="${numberOfBooks}"]`);
    book.appendChild(document.createElement('img')).classList.add(`closeImg-${numberOfBooks}`,"closeImg");
    book.appendChild(document.createElement('div')).classList.add(`title-${numberOfBooks}`, "title");
    book.appendChild(document.createElement('div')).classList.add(`author-${numberOfBooks}`, "author");
    book.appendChild(document.createElement('div')).classList.add(`year-${numberOfBooks}`, "year");
    book.appendChild(document.createElement('div')).classList.add(`pages-${numberOfBooks}`, "pages");
    book.appendChild(document.createElement('button')).classList.add(`button-${numberOfBooks}`, "notRead", "button");

}

function readButton(){
    const buttons = document.querySelectorAll(`.button`);
    buttons.forEach(button =>{
        button.addEventListener('click', ()=>{
            if(button.classList.contains('read')){
                button.classList.remove('read');
                button.textContent = 'Not read';
            }else {
                button.classList.add('read');
                button.textContent = 'Read';
            }
        })
    })
}

function removeBook(){
    const closeButton = document.querySelectorAll('.closeImg');
    console.log(closeButton);
    closeButton.forEach(button =>{
        button.addEventListener('click',()=>{
            const book = button.parentNode;
            book.remove();
        })
    })
}

addButton();
formPopup();