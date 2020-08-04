import "./MovieItems.js";
import $ from "jquery";

class MovieList extends HTMLElement{

    constructor(){
        super();
        
    }

    set movies(movies){
        this._movies = movies;
        this.render();
    }

    render(){
        this.innerHTML = "";
        this.style.paddingLeft = "80px";
        this.setAttribute("class", "row");
        this._movies.forEach(movie => {
            const movieItemElement = document.createElement("movie-item");
            movieItemElement.movie = movie;
            this.appendChild(movieItemElement);
        });

        const detail =  document.querySelectorAll(".modal-detail-button");
        detail.forEach(element => {
            element.addEventListener("click", function(){
            
                    const baseUrl = `https://api.themoviedb.org/3/movie/${this.getAttribute('data-movie-id')}`;
                    const query = `?api_key=7c2d12e858a495bb9666bef5b80f590c&language=en-US`;
                    
                    function genre_tag(genres){
        
                        let genre = ``;
                
                        genres.forEach(genre_item => {
                            genre += `<button type="button" class="btn btn-sm m-1 btn-primary" disabled>${genre_item.name}</button>`;
                        });
                        return genre;
                    }
        
                    fetch(`${baseUrl}${query}`) 
                        .then(response => {
                            return response.json();
                        })
                        .then(responseJson => {
                            let modalInner = ``;
                            if(responseJson.overview != undefined){
                                modalInner = `
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <img src="https://image.tmdb.org/t/p/w500${responseJson.poster_path}" alt="" class="img-fluid">
                                        </div>
                                        <div class="col-md">
                                            <ul class="list-group">
                                                <li class="list-group-item"><h4>${responseJson.original_title}</h4></li>
                                                <li class="list-group-item"><strong>Genre:</strong> ${genre_tag(responseJson.genres)}</li>
                                                <li class="list-group-item"><strong>Popularity :</strong> ${responseJson.popularity}</li>
                                                <li class="list-group-item"><strong>Rating :</strong> ${responseJson.vote_average}/ 10</li>
                                                <li class="list-group-item"><strong>Released :</strong> ${responseJson.release_date}</li>
                                                <li class="list-group-item"><strong>Overview:</strong> <br> ${responseJson.overview}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                `;
                            }
                            else{
                                modalInner = `
                                <div class="alert alert-danger" role="alert">
                                    Sorry, this movie doesn't have detail information
                                </div>
                                `
                            }
            
                            const modalBody = document.querySelector(".content");
                            modalBody.innerHTML = modalInner;
        
                            const buttonRemoveList = document.querySelector(".remove-list");
                            buttonRemoveList.setAttribute("data-item-id", responseJson.id);
            
                        })
                        .catch(status_message => {
                            console.log(status_message);
                        })
        
                        document.querySelector(".remove-list").addEventListener("click", function(){
        
                            const media = {
                                media_id: this.getAttribute('data-item-id')
                            }
        
                            fetch(`https://api.themoviedb.org/3/list/${sessionStorage.getItem('list_id')}/remove_item?api_key=7c2d12e858a495bb9666bef5b80f590c&session_id=${sessionStorage.getItem('session_id')}`, {
                                method : "POST",
                                headers : {
                                    "Content-Type" : "application/json"
                                },
                                body : JSON.stringify(media)
                            })
                            .then(response => {
                                return response.json();
                            })
                            .then(() => {
                                window.location.replace("/myfile.html")
                            })
                            .catch(status_message => {
                                console.log(status_message);
                            })
        
                        })
                    
            })
        });

        
    }

}

customElements.define("movie-list", MovieList);