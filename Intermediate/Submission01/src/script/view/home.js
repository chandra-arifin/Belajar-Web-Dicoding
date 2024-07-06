import Utils from '../utils.js';
import Notes from '../data/notes.js';

const home = () => {
  const addFormElement = document.querySelector('#addForm');
  const notesListContainerElement = document.querySelector('#notesListContainer');
  const noteListElement = notesListContainerElement.querySelector('notes-list');

  const showNotesTitle = () => {

    const result = Notes.getAllNotes();

    displayResult(result);
  };

  const onAddHandler = (event) => {
    event.preventDefault();

    const title = event.target.elements.title.value;
    const body = event.target.elements.body.value;
    Notes.addNote(title, body);
    showNotesTitle();
    event.target.elements.title.value = "";
    event.target.elements.body.value = "";
    const titleInput = document.getElementById('title');
    titleInput.focus();
  };

  const displayResult = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement('note-item');
      noteItemElement.note = note;

      return noteItemElement;
    });

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  };

  showNotesTitle();
  addFormElement.addEventListener('submit', onAddHandler);
};

export default home;
