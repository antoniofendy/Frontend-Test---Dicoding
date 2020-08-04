class NavBar extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
    }

    render(){

        this.innerHTML = `

        <nav class="navbar navbar-expand-lg navbar-light bg-warning fixed-top">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a class="navbar-brand" href="#"><b>FilmKu</b></a>
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <a class="nav-link index" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link my-file" href="myfile.html">My File</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0 ml-auto search-form">
                    <input class="form-control mr-sm-2 search-area" type="search" placeholder="Search Movie" aria-label="Search">
                    <button class="btn btn-success my-2 my-sm-0 search-button">Search</button>
                </form>
            </div>
        </nav>
        `;
    }

}

customElements.define("nav-bar", NavBar);