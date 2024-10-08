class Hero extends HTMLElement {
    _shadowRoot = null
    _style = null

    constructor() {
        super()

        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._style = document.createElement('style')
    }

    _updateStyle() {
        this._style.textContent = `


.hero__img {
    width: 100%;
}
    
.hero {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    height: 100%;
    text-align: center;
}
          
.hero__inner {
  margin: 0 auto;
  max-width: 800px;
}


.hero__tagline {
  margin-top: 16px;
  font-size: 18px;
  font-weight: 300;
}

.hero__title {
    font-weight: 500;
    font-size: 26px;
}

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
    <div class="hero" >
        <img class="hero__img" src="https://restaurant-api.dicoding.dev/images/large/45" alt="gambar resto"/>
        <div class="hero__inner">
            <h1 class="hero__title">Restaurant Apps</h1>
            <p class="hero__tagline">
                This Restaurant Apps contains alot of recommendation to more places that provides more foods and beverages.
            </p>
        </div>
    </div>
    `
    }
}

customElements.define('hero-component', Hero)
