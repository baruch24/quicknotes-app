const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const notesList = document.querySelector('#notes-list');
const noteCategory = document.querySelector('#note-category');
const noteCount = document.querySelector('#note-count');
const searchInput = document.querySelector('#search-input');
const errorMessage = document.querySelector('#error-message');

let notes = JSON.parse(localStorage.getItem('notes')) || [];


function render() {
    const term = searchInput.value.trim().toLowerCase();
    const visible = notes.filter(note => note.text.toLowerCase().includes(term));

  notesList.textContent = '';
  visible.forEach(note => {
    let li = document.createElement('li');
    li.className = 'note';
    li.classList.add(note.category);
    li.textContent = note.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      notes = notes.filter(n => n.id !== note.id);
      function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
        }
        saveNotes();
        
      render();
    });

    li.appendChild(deleteButton);   

    notesList.appendChild(li);
  });

 if (notes.length === 0) {
    noteCount.textContent = `You have no notes yet.`;
    }else if (notes.length === 1) {
    noteCount.textContent = 'You have 1 note.';
    } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
    }
 
}

noteForm.addEventListener('submit', (event) => {
searchInput.addEventListener('input', render);
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  if (text.length > 200) {
    errorMessage.textContent = 'Note cannot exceed 200 characters.';
    return;
  }

  if (text === '') {
    errorMessage.textContent = 'Note cannot be empty.';
    return;
  }

  const newNote = {
    id: Date.now(),
    text,
    category,
    createdAt: new Date().toISOString()
  };

  notes.push(newNote);
  function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
  }
  saveNotes();

  noteInput.value = '';
  noteCategory.value = 'personal';
  render();
});

 render()

 