const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

const bookForm = document.getElementById('bookForm');
const addBookButton = document.getElementById('addBookButton');
const overlay = document.getElementById('overlay');

function saveLibrary() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function showBooks() {
  const place = document.getElementById('library');
  place.innerHTML = '';

  myLibrary.forEach((book, i) => {
    place.innerHTML += `
      <div class="book-card">
        <h3>${book.title}</h3>
        <p>Автор: ${book.author}</p>
        <p>Страниц: ${book.pages}</p>
        <p>Прочитано: ${book.isRead === 'yes' ? 'Да' : 'Нет'}</p>
        <button onclick="deleteBook(${i})">Удалить</button>
      </div>
    `;
  });
}

function deleteBook(i) {
  myLibrary.splice(i, 1);
  saveLibrary();
  showBooks();
}

function addBook(e) {
  e.preventDefault();

  const book = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    pages: document.getElementById('pages').value,
    isRead: document.querySelector('input[name="isRead"]:checked')?.value || 'no'
  };

  myLibrary.push(book);
  saveLibrary();
  showBooks();

  bookForm.reset();
  bookForm.style.display = 'none';
  overlay.style.display = 'none';
}

function openForm() {
  bookForm.style.display = 'block';
  overlay.style.display = 'block';
}

overlay.onclick = () => {
  bookForm.style.display = 'none';
  overlay.style.display = 'none';
};

addBookButton.onclick = openForm;
bookForm.onsubmit = addBook;

showBooks();
