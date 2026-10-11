const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const notesList = document.querySelector('#notes-list');
const noteCategory = document.querySelector('#note-category');
const noteCount = document.querySelector('#note-count');
const searchInput = document.querySelector('#search-input');
const errorMessage = document.querySelector('#error-message');

let notes = [];

function render() {
  notesList.textContent = '';
  notes.forEach(note => {
    let li = document.createElement('li');
    li.className = 'note';
    li.classList.add(note.category);
    li.textContent = note.text;
    notesList.appendChild(li);
  });
}

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  const newNote = {
    id: Date.now(),
    text,
    category,
    createdAt: new Date().toISOString()
  };

  notes.push(newNote);

  noteInput.value = '';
  noteCategory.value = 'personal';
  render();
});

 render()