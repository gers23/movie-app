console.log('Hello');



addElementDiv()

// variables
let searchValue = 'sort_by=popularity.desc'
const movieContainer = document.querySelector('movie-container');
const search = document.querySelector('.search');
const formObj = document.querySelector('form');
let url ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0051f4a31a256cb9423c02742ebd4499';


//functions
async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);git
    showData(data);
}

function createURL(searchValue) {
    if(searchValue === 'Search') {
        url ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0051f4a31a256cb9423c02742ebd4499'; 
    } else {
        url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=0051f4a31a256cb9423c02742ebd4499`;
    }
    clearDiv()
    getData()
    showOverview()
}

function addElementDiv() {
    let div = document.createElement('div');
    div.className = 'movie-container';
    document.querySelector('main').prepend(div);
    
}

function addelementMoviesDiv(index) {
    let movieDiv = document.createElement('div');
    let infoDiv = document.createElement('div');
    let synopsisDiv = document.createElement('div');
    movieDiv.className = 'movie';
    infoDiv.className = 'info-movie';
    synopsisDiv.className = 'synopsis-movie'
    document.querySelector('.movie-container').append(movieDiv);
    document.querySelectorAll('.movie')[index].append(infoDiv);
    document.querySelectorAll('.movie')[index].append(synopsisDiv);

}

function showData(data) {
    data['results'].map((el, index) => {
        addelementMoviesDiv(index)
        let image = `https://image.tmdb.org/t/p/w1280${el['poster_path']}`;
        let img = `<img class='movie-img' src=${image} alt=${el['title']}>`;
        document.querySelectorAll('.movie')[index].insertAdjacentHTML('afterbegin', img);   
        let title = `<h3>${el['title']}</h3>`;
        document.querySelectorAll('.info-movie')[index].insertAdjacentHTML('afterbegin', title); 
        let rating = `<span>${el['vote_average'].toString().padEnd(3, '.0')}</span>`;
        document.querySelectorAll('.info-movie')[index].insertAdjacentHTML('beforeend', rating );
        addColorRating (el['vote_average'], index);
        let overview = `<h3>Overview</h3>${el['overview']}`;
        document.querySelectorAll('.synopsis-movie')[index].insertAdjacentHTML('afterbegin', overview);
        
    })
}

function addColorRating (num, index) {
    if (num > 7) {
        document.querySelectorAll('.info-movie')[index].classList.add('green');
    } else if (num > 4 && num < 7) {
        document.querySelectorAll('.info-movie')[index].classList.add('yellow');
    } else {
        document.querySelectorAll('.info-movie')[index].classList.add('red');
    }
}

function clearDiv() {
    document.getElementsByClassName('movie-container')[0].innerHTML = '';
}

function showOverview() {
    setTimeout(() => {
        const movie = document.querySelectorAll('.movie');
        movie.forEach(el => el.addEventListener('mouseenter', function(event) {
            let target = event.target;
            let synopsis = target.querySelector('.synopsis-movie'); 
            synopsis.classList.add('show');
        }))
        movie.forEach(el => el.addEventListener('mouseleave', function(event) {
            event.target.querySelector('.synopsis-movie').classList.remove('show');
        }))
    }, 1000);
}


// events
formObj.addEventListener('submit', (e) => {
    e.preventDefault();
})

search.addEventListener('change', (e) => {
    if(e.target.value !== '') {
        searchValue = e.target.value;
    } else {
        searchValue = 'Search';
    }
    document.getElementsByClassName(('search'))[0].placeholder = searchValue;
    createURL(searchValue);
});


document.getElementsByClassName('search')[0].focus();
getData();
showOverview()