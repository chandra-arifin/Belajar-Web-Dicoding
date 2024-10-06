import Swal from 'sweetalert2';

const BASE_URL = 'https://notes-api.dicoding.dev/v2'

class Notes {

  static showSuccessMessage = (message) => {
    Swal.fire('Success!', message, 'success');
  }

    static showErrorMessage = (message) => {
      Swal.fire('Error!', message, 'error');
    }

    static getAllNotes = async () => {
        const response = await fetch(`${BASE_URL}/notes`)

        if (!(response.status >= 200 && response.status < 300)) {
            throw new Error(`Ada Yang Salah Disini...`)
        }

        const responseJson = await response.json()
        const { data: notes } = responseJson

        return notes
    }

    static addNote = async (title, body) => {
        try 
        {
            const data = {
                title: title,
                body: body,
            }

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': '12345',
                },
                body: JSON.stringify(data),
            }

            const response = await fetch(`${BASE_URL}/notes`, options)
            const responseJson = await response.json()
            this.showSuccessMessage(responseJson.message)
            this.getAllNotes()
        } catch (error) {
            this.showResponseMessage(error)
        }
    }

    static deleteNote = async (noteId) => {
        fetch(`${BASE_URL}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'X-Auth-Token': '12345',
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                return this.getAllNotes()
            })
            .then((newNote) => {
                this.showSuccessMessage(
                    'Note Deleted!\nPlease Refresh Browser'
                )
            })
            .catch((error) => {
                this.showResponseMessage(error)
            })
    }

    static showResponseMessage = (
        message = 'Check your internet connection'
    ) => {
      Swal.fire('Error!', message, 'error');
    }
}

export default Notes
