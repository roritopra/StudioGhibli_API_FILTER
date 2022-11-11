import "./components/index.js";
import { getData } from "./services/fetch.js";

class AppContainer extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback(){
        console.log('entra');
        const data = await getData();
        this.render(data);
        console.log("connected callback");

        const card = this.shadowRoot?.querySelectorAll("app-card");
        card?.forEach((e,index)=>{
            e.addEventListener("save-user",(evt: CustomEvent)=>{
                const tittle = evt.detail.tittle;
                const release_date = evt.detail.release_date;
                const image = evt.detail.image;
                const user = {
                    tittle: tittle,
                    release_date: release_date,
                    image: image
                }

                
                localStorage.setItem("user"+index,JSON.stringify(user));
            });
        });

        const input = this.shadowRoot?.querySelector('input');
        input.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            card.forEach((item) => {
                if(item.name.toLowerCase().includes(target.value.toLowerCase())) return item.classList.remove('hidden');

                item.classList.add('hidden');
            });
        });
    }

    render(data){
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="components/style.css">
            <input type="text" name="filter">
        `;
        data.forEach(e => {
            this.shadowRoot.innerHTML += `<app-card tittle=${e.title} release_date=${e.release_date} image=${e.image}></app-card>`            
        }); 
    }
}

customElements.define("app-container",AppContainer);