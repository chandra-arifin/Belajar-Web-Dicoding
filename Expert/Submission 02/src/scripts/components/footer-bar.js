class FooterBar extends HTMLElement {
    _shadowRoot = null
    _style = null

    constructor() {
        super()

        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._style = document.createElement('style')
    }

    _updateStyle() {
        this._style.textContent = `
      

    `
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = ''
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this._emptyContent()
        this._updateStyle()

        this._shadowRoot.appendChild(this._style)
        this._shadowRoot.innerHTML += `      
      <div>
        Copyright &copy; 2020 - Hunger App
      </div>
    `
    }
}

customElements.define('footer-bar', FooterBar)
