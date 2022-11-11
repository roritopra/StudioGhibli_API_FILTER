export var Attribute;
(function (Attribute) {
    Attribute["tittle"] = "tittle";
    Attribute["release_date"] = "release_date";
    Attribute["image"] = "image";
})(Attribute || (Attribute = {}));
export class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    static get observedAttributes() {
        const attrs = {
            tittle: null,
            image: null,
            release_date: null,
        };
        return Object.keys(attrs);
    }
    connectedCallback() {
        var _a;
        this.render();
        const btn = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button');
        btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', () => {
            const event = new CustomEvent("save-user", {
                detail: { tittle: this.tittle, release_date: this.release_date, image: this.image },
                composed: true
            });
            this.dispatchEvent(event);
        });
    }
    attributeChangedCallback(propName, _, newValue) {
        switch (propName) {
            case Attribute.release_date:
                this.release_date = newValue ? Number(newValue) : undefined;
                break;
            default:
                this[propName] = newValue;
                break;
        }
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="components/card.css">
                <section>
                <h1>${this.tittle}:</h1>
                <p>${this.release_date}</p>
                <image class="imag" src="${this.image}">
                <button>Guardar a favoritos</button>
                </section>
                `;
        }
    }
}
customElements.define("app-card", Card);
