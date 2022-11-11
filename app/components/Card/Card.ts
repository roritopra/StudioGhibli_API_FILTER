export enum Attribute {
    "tittle" = "tittle",
    "release_date" = "release_date",
    "image" = "image",
}

export class Card extends HTMLElement {
    tittle?: string;
    image?: string;
    release_date?: number;
    
    
    static get observedAttributes() {
        const attrs: Record<Attribute, null> = {
            tittle: null,
            image: null,
            release_date: null,
            
        };
        return Object.keys(attrs);
    }
    
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }
    
    connectedCallback(){
        this.render();
        
        const btn = this.shadowRoot?.querySelector('button');
        btn?.addEventListener('click',()=>{
            const event: CustomEvent<{tittle:string,release_date:number,image:string}> = new CustomEvent("save-user",{
                detail: {tittle: this.tittle, release_date: this.release_date, image: this.image},
                composed: true
            });
            this.dispatchEvent(event);
        })
    }
    
    attributeChangedCallback(
        propName: Attribute,
        _: string | undefined,
        newValue: string | undefined
        ) {
            switch (propName) {
                case Attribute.release_date:
                    this.release_date = newValue? Number(newValue) : undefined;
                    break;

                default:
                this[propName] = newValue;
                break;
            }
            
            this.render();
        }
        
        render(){
            if(this.shadowRoot){
                this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="components/card.css">
                <section>
                <h1>${this.tittle}:</h1>
                <p>${this.release_date}</p>
                <image class="imag" src="${this.image}">
                <button>Guardar a favoritos</button>
                </section>
                `
            }
        }
    }
    
customElements.define("app-card",Card);