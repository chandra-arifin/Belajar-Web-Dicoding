class Loading extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
            <style>
                .loading-container {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;ss
                    background-color: rgba(255, 255, 255, 0.8);
                    z-index: 9999;
                    justify-content: center;
                    align-items: center;
                }
                .loading-spinner {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
            <div class="loading-container">
                <div class="loading-spinner"></div>
            </div>
        `
    }

    connectedCallback() {
        this.showLoading()
    }

    showLoading() {
        this.shadowRoot.querySelector('.loading-container').style.display =
            'flex'
    }

    hideLoading() {
        this.shadowRoot.querySelector('.loading-container').style.display =
            'none'
    }
}

customElements.define('loading-component', Loading)
