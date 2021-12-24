const API_KEY = "794f7ba7-f714-40d1-9263-452a199dffcf";
const API_URL_SERIAL=
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?order=YEAR&type=TV_SHOW&ratingFrom=0&ratingTo=10&yearFrom=1888&yearTo=2020&page=";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

// Асинхронная функция вызова данных из API Кинопоиска
let respData;
async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      method: 'GET',
      'X-API-KEY': API_KEY, 
      'Content-Type': 'application/json', 
    },
  });
  respData = await resp.json();
  showMovies(respData);
};
getMovies(API_URL_SERIAL);

function getClassByRate(rating) {
  if (rating >= 7) {
    return "green";
  } else if (rating > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {

  const moviesEl = document.querySelector('#movies');
  
  // Очищает предыдущий нашедший фильм
  document.querySelector("#movies").innerHTML = '';

   // Создаем разметку HTML карточку фильма
  data.films.forEach((movie) => {
    
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");


  
    movieEl.innerHTML = `
       
        <a href="${movie.posterUrlPreview}" onclick="getIdFilm(${movie.filmId}); getIdFilm2(${movie.filmId});" data-hystmodal="#myModal-${movie.filmId}">
          <div class="movie__cover-inner">
            <img
              src="${movie.posterUrlPreview}"
              class="movie__cover"
              alt="${movie.nameRu}"
            />
            <div class="movie__cover--darkened"></div>
          </div></a>
          <div class="movie__info">
            <div class="movie__title">${movie.nameRu || movie.nameEn}</div>
              <div class="movie__category">${movie.genres.map(
                (genre) => ` ${genre.genre}`)}</div>
              <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${Math.abs(movie.rating) || `0`}</div>
              </div>
              <!-- Блок модального окна -->
        <div class="hystmodal" id="myModal-${movie.filmId}" aria-hidden="true">
                <div class="hystmodal__wrap">
                    <div class="hystmodal__window" role="dialog" aria-modal="true">
                      <button data-hystclose class="hystmodal__close"></button>
                      <!-- Ваш HTML код модального окна -->
                      <div class="movie-show">
                      <div class="movie-show__cover-inner">
                          <img src="${movie.posterUrlPreview}" class="movie-show__cover" id="${movie.filmId}" alt="${movie.nameRu}" />
                      </div>
                      <div class="movie-show__info">
                          <div class="movie-show__title">${movie.nameRu || movie.nameEn}</div>
                              <div class="movie-show__category">${movie.genres.map(
                              (genre) => ` ${genre.genre || `Неизвестно`}`
                          )}</div>
                          <div class="movie-show__country">Страна: ${movie.countries.map(
                            (country) => ` ${country.country || `Неизвестно`}`
                        )}</div>
                          <div class="movie-show__year">Год выхода: ${movie.year || `Неизвестно`}</div>
                          <div class="movie-show__director" id="director-${movie.filmId}"></div>
                          <div class="movie-show__actor" id="actor-${movie.filmId}"></div>
                          <div class="movie-show__length" id="length-${movie.filmId}"></div>
                          <div class="movie-show__description" id="desc-${movie.filmId}"></div>
                          <div class="movie-show__average movie-show__average--${getClassByRate(movie.rating)}">${Math.abs(movie.rating) || `0`}
                       </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>`;
        moviesEl.appendChild(movieEl);

        const myModal = new HystModal({
          linkAttributeName: "data-hystmodal",
        });
  });
}

// Поиск
const form = document.querySelector(".search");
const search = document.querySelector(".search__text");

// Поиск для клика мышкой на лупу

form.addEventListener('click', function(e) {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);
    search.value = "";
  } 
});

// Поиск для enter

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);
    search.value = "";
  }
});

// Кнопка "Что там дальше?"
let page = 1;
button.addEventListener('click', function(e) {
  e.preventDefault();
  page = page + 1;
  const apiSerials = `${API_URL_SERIAL}${page}`;
  getMovies(apiSerials);
}); 

$("#button").click(function() {
  $("html").animate({ scrollTop: 0 }, "slow");
  });


// Полное описание фильма с вызовом 2 url API
function getIdFilm(id) {
  let url;
  url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`;
  let desc;
   async function getDescMovies() {
     const resp = await fetch(url, {
       headers: {
         method: 'GET',
         'X-API-KEY': API_KEY, 
         'Content-Type': 'application/json', 
       },
     });
     desc = await resp.json();
     let descr = document.getElementById('desc-' + id);
     descr.innerHTML = `Описание: ${desc.description || `Неизвестно`}`;
     let length = document.getElementById('length-' + id);
     length.innerHTML = `Продолжительность: ${desc.filmLength || `Неизвестно`} мин.`;
   }
   getDescMovies();
 }
 
 // Информация о том кто играл в фильме и кто срежиссировал
 function getIdFilm2(id2) {
   let url;
   url = `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id2}`;
   let pers;
    async function getPersonaMovies() {
      const resp = await fetch(url, {
        headers: {
          method: 'GET',
          'X-API-KEY': API_KEY, 
          'Content-Type': 'application/json', 
        },
      });
      pers = await resp.json();
      const actors = pers.map(nameRu => nameRu.nameRu);
      const directors = pers.map(nameRu => nameRu.nameRu);
      let director = document.getElementById('director-' + id2);
      director.innerHTML = `Режиссер: ${directors[0] || `Неизвестно`}`;
      let actor = document.getElementById('actor-' + id2);
      actor.innerHTML = `В ролях: ${actors[1] || `Неизвестно`}, ${actors[2] || `Неизвестно`}, ${actors[3] || `Неизвестно`}, ${actors[4] || `Неизвестно`}, ${actors[5] || `Неизвестно`}, ${actors[6] || `Неизвестно`}, ${actors[7] || `Неизвестно`}...`;
    }
    getPersonaMovies();
  }