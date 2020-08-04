import "../../component/NavBar.js";
import "../../component/HorizontalList.js";
import "../../component/HorizontalItems.js";
import "../../component/TrendingList.js";

const apiKey = `?api_key=7c2d12e858a495bb9666bef5b80f590c`;
let query = `&language=en-US`;
const baseUrlMovie = `https://api.themoviedb.org/3/movie/`;
const baseUrlTv = `https://api.themoviedb.org/3/tv/`;
const baseUrlTrending = `https://api.themoviedb.org/3/trending/movie/day`;
const baseUrlSearching = `https://api.themoviedb.org/3/search/multi?api_key=7c2d12e858a495bb9666bef5b80f590c&language=en-US&include_adult=false&query=`;

function setTokenNSession(){

    // var guess_session = sessionStorage.getItem("guess_session");
    // var request_token = sessionStorage.getItem("request_token");
    // var user_token = sessionStorage.getItem("user_token");
    var session_id = sessionStorage.getItem("session_id");
    
    if(session_id == undefined){
        //*****************************************************/
        //fetching for guest_session
        //*****************************************************/
        fetch(`https://api.themoviedb.org/3/authentication/guest_session/new${apiKey}`)
                .then(response => {
                    return response.json();
                })
                .then(responseJson => {
                    sessionStorage.setItem("guess_session", responseJson.guest_session_id);
                })
                .catch(status_message => {
                    console.log(status_message);
                })
        //*****************************************************/
        //fetching for token_session
        //*****************************************************/
        fetch(`https://api.themoviedb.org/3/authentication/token/new${apiKey}`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                sessionStorage.setItem("request_token", responseJson.request_token);
            })
            .then(() =>{
                //*****************************************************/
                //fetching user_token
                //*****************************************************/
                const requestToken = {
            
                    username: "antonio_fendy",
                    password: "fendy.220901",
                    request_token: `${sessionStorage.getItem("request_token")}`
                }
        
                fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login${apiKey}`, {
                    method : "POST",
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify(requestToken),
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(responseJson => {
                        sessionStorage.setItem("user_token", responseJson.request_token);
                    })
                    .then(() => {
                        //*****************************************************/
                        //fetching for session_id
                        //*****************************************************/
                        const token = {
                            request_token : `${sessionStorage.getItem("user_token")}`
                        }
                        fetch(`https://api.themoviedb.org/3/authentication/session/new${apiKey}`, {
                            method: 'POST',
                            headers:{
                                "Content-Type" : "application/json"
                            },
                            body : JSON.stringify(token),
                        })
                            .then(response => {
                                return response.json();
                            })
                            .then(responseJson => {
                                sessionStorage.setItem("session_id", responseJson.session_id);
                            })
                            .then(()=> {
                                //*****************************************************/
                                //creating list
                                //*****************************************************/
                                const list = {
                                    name:"mylist",
                                    description: "my default list",
                                    language: "en"
                                }

                                fetch(`https://api.themoviedb.org/3/list?api_key=7c2d12e858a495bb9666bef5b80f590c&session_id=${sessionStorage.getItem("session_id")}`, {
                                    method: 'POST',
                                    headers:{
                                        "Content-Type" : "application/json"
                                    },
                                    body : JSON.stringify(list)
                                })
                                    .then(response => {
                                        return response.json();
                                    })
                                    .then(responseJson => {
                                        sessionStorage.setItem("list_id", responseJson.list_id);
                                    })
                                    .catch(status_message => {
                                        console.log(status_message);
                                    })
                            })
                            .catch(status_message => {
                                console.log(status_message);
                            })
                    })
                    .catch(status_message => {
                        console.log(status_message);
                    })
            })
            .catch(status_message => {
                console.log(status_message);
            })
    }

}

function topRated(){

    const TopRatedElement = document.querySelector(".top-rated");
    const HorizontalListElement = document.createElement("horizontal-list");

    fetch(`${baseUrlMovie}top_rated${apiKey}${query}`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            HorizontalListElement.lists = responseJson.results;
        })
        .catch(error => {
            console.log(error);
        });

    TopRatedElement.appendChild(HorizontalListElement);

}

function popular(){
    const PopularElement = document.querySelector(".popular");
    const HorizontalListElement = document.createElement("horizontal-list");

    fetch(`${baseUrlMovie}popular${apiKey}${query}`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            HorizontalListElement.lists = responseJson.results;
        })
        .catch(error => {
            console.log(error);
        });

    PopularElement.appendChild(HorizontalListElement);
}

function trending(){
    
    const TrendingElement = document.querySelector(".trending");
    const TrendingListElement = document.createElement("trending-list");

    fetch(`${baseUrlTrending}${apiKey}`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            TrendingListElement.trendings = responseJson.results;
        })
        .catch(error => {
            console.log(error);
        });

    TrendingElement.appendChild(TrendingListElement);

}

function searchMovie(searchValue){

    const sectionElement = document.querySelector("section");
    const TrendingListElement = document.createElement("trending-list");
    
    fetch(`${baseUrlSearching}${searchValue}`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            TrendingListElement.trendings = responseJson.results;
        })
        .catch(error => {
            console.log(error);
        });

        sectionElement.appendChild(TrendingListElement);

}

const main = () => {
    
    const nav = document.querySelector(".index");
    nav.setAttribute("style", "font-weight:bold");

    setTokenNSession();

    topRated();
    popular();
    trending();

    const searchForm = document.querySelector(".search-form");

    searchForm.addEventListener("submit", function (e){
        e.preventDefault();
        
        const searchValue = document.querySelector(".search-area");
        
        if(searchValue.value == ""){
            alert("Please input a valid search key !");
        }
        else{

            const sectionElement = document.querySelector("section");
            sectionElement.innerHTML = "";

            searchMovie(searchValue.value);

        }

    }); 

    

}

export default main;
