class HorizontalItems extends HTMLElement{

    constructor(){
        super();
    }

    set list(list){
        this._list = list;
        this.render();
    }

    render(){

        this.innerHTML = `

        <style>
            .img-item{
                width : 200px;
                height : 300px;
                margin: 5px
            }
            .img-item:hover{
                transform: scale(1.2);
                cursor: pointer;
            }

            * {
                outline: none;
            }
        </style>

        <button class="border-0 button-img" data-list-id="${this._list.id}" data-toggle="modal" data-target="#itemDetailModal"><img src="https://image.tmdb.org/t/p/w500${this._list.poster_path}" class="img-item"></button>
        `;
        
        
        
        
    }

}

customElements.define("horizontal-item", HorizontalItems)