import Notes from '../data/notes.js'
import anime from 'animejs';

class NoteItem extends HTMLElement {
    _shadowRoot = null
    _style = null
    _note = {
        id: null,
        title: null,
        body: null,
        createdAt: null,
        archived: null,
    }

    constructor() {
        super()

        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._style = document.createElement('style')
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = ''
    }

    set note(value) {
        this._note = value

        // Render ulang
        this.render()
    }

    get note() {
        return this._note
    }

    _updateStyle() {
        this._style.textContent = `
      :host {
        display: block;
        border-radius: 8px;
        
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
        overflow: hidden;
      }

      .hapus {
        border: 0;
        padding-inline: 24px;
        background-color: red;

        text-transform: uppercase;
        font-size: 1.5rem;
        color: white;

        cursor: pointer;

        transition: 100ms linear;
      }

      .note-info {
        padding: 16px 24px;
      }

      .note-info__title h2 {
        font-weight: lighter;
      }

      .note-info__body p {
        display: -webkit-box;
        margin-top: 10px;
        
        overflow: hidden;

        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5; /* number of lines to show */
      }
    `
    }

    render() {
        this._emptyContent()
        this._updateStyle()

        this._shadowRoot.appendChild(this._style)

        const container = document.createElement('div')
        container.classList.add('card')
        container.addEventListener('mouseenter', (event) => {
            container.style.backgroundColor = '#D8EFD3'; 
            anime({
              targets: card,
              scale: 1.1, 
              duration: 300,
              easing: 'easeOutQuad',
          });
        })

        container.addEventListener('mouseleave', () => {
            container.style.backgroundColor = ''; 
            anime({
                targets: card,
                scale: 1, 
                duration: 300,
                easing: 'easeOutQuad',
            });
        });
        
        const card = document.createElement('div')
        card.classList.add('note-info')

        const title = document.createElement('h2')
        title.classList.add('note-info__title')
        title.textContent = this._note.title
        card.appendChild(title)

        const body = document.createElement('p')
        body.classList.add('club-info__body')
        body.textContent = this._note.body
        card.appendChild(body)

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('hapus')
        deleteButton.textContent = 'Delete'
        deleteButton.dataset.id = this._note.id
        deleteButton.addEventListener('click', (event) => {
            Notes.deleteNote(event.target.dataset.id)
        })
        card.appendChild(deleteButton)

        container.appendChild(card)

        this._shadowRoot.appendChild(container)
    }
}

customElements.define('note-item', NoteItem)
