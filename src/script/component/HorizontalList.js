import "./HorizontalItems.js";

class HorizontalList extends HTMLElement{

    constructor(){
        super();
    }

    set lists(lists){
        this._lists = lists;
        this.render();
    }

    render(){
        this.innerHTML = `
        `;
        this._lists.forEach(list => {
            const ListItemElement = document.createElement("horizontal-item");
            ListItemElement.list = list;
            this.appendChild(ListItemElement);
        });

        const detail = document.querySelectorAll(".button-img");

        detail.forEach(element => {
            element.addEventListener("click", function(){

            const baseUrl = `https://api.themoviedb.org/3/movie/${this.getAttribute('data-list-id')}`;
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

                    const buttonAddList = document.querySelector(".add-list");
                    buttonAddList.setAttribute("data-item-id", responseJson.id);
    
                })
                .catch(status_message => {
                    console.log(status_message);
                })

                document.querySelector(".add-list").addEventListener("click", function(){
                    // console.log(this.getAttribute('data-item-id'));

                    const media = {
                        media_id: this.getAttribute('data-item-id')
                    }

                    fetch(`https://api.themoviedb.org/3/list/${sessionStorage.getItem('list_id')}/add_item?api_key=7c2d12e858a495bb9666bef5b80f590c&session_id=${sessionStorage.getItem('session_id')}`, {
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

customElements.define("horizontal-list", HorizontalList);