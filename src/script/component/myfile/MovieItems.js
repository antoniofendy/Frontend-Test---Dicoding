class MovieItems extends HTMLElement{

    constructor(){
        super();
    }

    set movie(movie){
        this._movie = movie;
        this.render();
    }

    title(){
        if(this._movie.original_name === undefined){
            return (this._movie.original_title);
        }
        else{
            return (this._movie.original_name);
        }
    }

    percentage(){
        return (this._movie.vote_average * 10);
    }

    

    render(){

        this.innerHTML = `

        <style>

            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .img-card{
                width : 100%;
                height : 300px;
            }
            .card{
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            }
        </style>

        <div class="card m-3" style="width: 18rem;">
        <img src="https://image.tmdb.org/t/p/w500${this._movie.poster_path}" class="img-card">
            <div class="card-body text-left">
                <h5 class="card-title">${this.title()}</h5>
                <h6 class="card-subtitle mb-2 text-muted text-uppercase">Popularity : ${this._movie.popularity}</h6>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" style="width: ${this.percentage()}%" aria-valuenow="${this._movie.vote_average}" aria-valuemin="0" aria-valuemax="10">${this._movie.vote_average}/10</div>
                </div>
                <button class="btn btn-info mt-2 modal-detail-button" data-toggle="modal" data-target="#itemDetailModal" data-movie-id="${this._movie.id}">Details</button>
            </div>
        </div>
        `;

        

    }

}

customElements.define("movie-item", MovieItems)