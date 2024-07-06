import Utils from '../utils.js'
import Notes from '../data/notes.js'
import Swal from 'sweetalert2';

const home = () => {
    const addFormElement = document.querySelector('#addForm')
    const notesListContainerElement = document.querySelector('#notesListContainer')
    const noteListElement =
        notesListContainerElement.querySelector('notes-list')
    const loadingComponent = document.querySelector('loading-component')

    const showErrorMessage = (message) => {
      Swal.fire('Error!', message, 'error');
    }

    const showLoading = () => {
        loadingComponent.showLoading()
    }

    const hideLoading = () => {
        setTimeout(() => {
            loadingComponent.hideLoading()
        }, 1000)
    }

    const showNotesTitle = async (query) => {
        showLoading()

        try {
            const result = await Notes.getAllNotes()
            displayResult(result)
            hideLoading()
        } catch (error) {
            hideLoading()
            showErrorMessage(error)
        }
    }

    const onAddHandler = (event) => {
        event.preventDefault()

        showLoading()

        try {
            const title = event.target.elements.title.value
            const body = event.target.elements.body.value
            Notes.addNote(title, body)
            showNotesTitle()
            event.target.elements.title.value = ''
            event.target.elements.body.value = ''
            const titleInput = document.getElementById('title')
            titleInput.focus()
            hideLoading()
        } catch (error) {
            hideLoading()
            showErrorMessage(error)
        }
    }

    const displayResult = (notes) => {
        const noteItemElements = notes.map((note) => {
            const noteItemElement = document.createElement('note-item')
            noteItemElement.note = note

            return noteItemElement
        })

        Utils.emptyElement(noteListElement)
        noteListElement.append(...noteItemElements)
    }

    showNotesTitle()
    addFormElement.addEventListener('submit', onAddHandler)
}

export default home
