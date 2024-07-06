import './styles/style.css'

import './script/components/index.js'

import home from './script/view/home.js'

document.addEventListener('DOMContentLoaded', () => {
    home()
})

const form = document.querySelector('form')
const strTitle = form.elements.title

form.addEventListener('submit', (event) => event.preventDefault())

const customValidationUsernameHandler = (event) => {
    event.target.setCustomValidity('')

    if (event.target.validity.valueMissing) {
        event.target.setCustomValidity('Harus diisi.')
        return
    }

    if (event.target.validity.tooShort) {
        event.target.setCustomValidity(
            'Minimal panjang adalah Tujuh (7) karakter.'
        )
        return
    }

    if (event.target.validity.patternMismatch) {
        event.target.setCustomValidity(
            'Tidak boleh diawali dengan simbol, mengandung white space atau spasi, dan mengandung karakter spesial seperti dolar ($).'
        )
        return
    }
}

strTitle.addEventListener('change', customValidationUsernameHandler)
strTitle.addEventListener('invalid', customValidationUsernameHandler)

strTitle.addEventListener('blur', (event) => {
    // Validate the field
    const isValid = event.target.validity.valid
    const errorMessage = event.target.validationMessage

    const connectedValidationId = event.target.getAttribute('aria-describedby')
    const connectedValidationEl = connectedValidationId
        ? document.getElementById(connectedValidationId)
        : null

    if (connectedValidationEl && errorMessage && !isValid) {
        connectedValidationEl.innerText = errorMessage
    } else {
        connectedValidationEl.innerText = ''
    }
})
