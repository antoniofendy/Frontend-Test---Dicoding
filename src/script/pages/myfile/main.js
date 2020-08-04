import "../../component/NavBar.js";
import "../../component/myfile/MovieList.js";

const apiKey = `?api_key=7c2d12e858a495bb9666bef5b80f590c`;
let query = `&language=en-US`;
const baseUrlMovie = `https://api.themoviedb.org/3/movie/`;
const baseUrlSearching = `https://api.themoviedb.org/3/search/multi?api_key=7c2d12e858a495bb9666bef5b80f590c&language=en-US&include_adult=false&query=`;


function fillMyList(){

    const myListElement = document.querySelector(".my-list");
    const MovieListElement = document.createElement("movie-list");
    myListElement.innerHTML = `
        <h1>My Movie List</h1>
    `;
    fetch(`https://api.themoviedb.org/3/list/${sessionStorage.getItem("list_id")}?api_key=7c2d12e858a495bb9666bef5b80f590c&language=en-US`)
        .then(response => {
            return response.json();
        })
        .then(responseJson =>{
            if(responseJson.items === undefined || responseJson.items.length === 0){
                myListElement.innerHTML += `
                <div class="alert alert-warning" role="alert">
                    Your don't have any movie listed in your list 
                </div>
                `
            }
            else{
                
                MovieListElement.movies = responseJson.items;
                
            }
        })
        .catch(status_message => {
            console.log(status_message);
        })
        
        myListElement.appendChild(MovieListElement);
}


const main = () => {

    const nav = document.querySelector(".my-file");
    nav.setAttribute("style", "font-weight:bold");

    fillMyList();

    const searchForm = document.querySelector(".search-form");
    searchForm.innerHTML = "";
}  

export default main;