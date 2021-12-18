const API_KEY = "794f7ba7-f714-40d1-9263-452a199dffcf";
const API_URL_MOVIE=
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?order=YEAR&type=FILM&ratingFrom=0&ratingTo=10&yearFrom=1888&yearTo=2020&page=";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL_MOVIE);

// Асинхронная функция вызова данных из API Кинопоиска

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      method: 'GET',
      'X-API-KEY': API_KEY, 
      'Content-Type': 'application/json', 
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

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
  const moviesEl = document.querySelector("#movies");

  // Очищает предыдущий нашедший фильм
  document.querySelector("#movies").innerHTML = '';
  
   // Создаем разметку HTML карточку фильма
  data.films.forEach((movie) => {
    
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
       
    <a href="${movie.posterUrlPreview}" data-hystmodal="#myModal-${movie.filmId}">
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
        <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${Math.abs(movie.rating)}</div>
        </div>

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
                        (genre) => ` ${genre.genre}`
                    )}</div>
                    <div class="movie-show__country">Страна: ${movie.countries.map(
                      (country) => ` ${country.country}`
                  )}</div>
                    <div class="movie-show__year">Год выхода: ${movie.year}</div>
                    <div class="movie-show__length">Продолжительность: ${movie.filmLength}</div>
                    <div class="movie-show__description">Описание: </div>
                    <div class="movie-show__average movie-show__average--${getClassByRate(movie.rating)}">${Math.abs(movie.rating)}
                 </div>
                 </div>
              </div>
          </div>
      </div>
  </div>`;
        moviesEl.appendChild(movieEl);

        const myModal = new HystModal({
          linkAttributeName: "data-hystmodal",
          // настройки (не обязательно), см. API
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

let page = 1;
button.addEventListener('click', function(e) {
  e.preventDefault();
  page = page + 1;
  const apiMovies = `${API_URL_MOVIE}${page}`;
  getMovies(apiMovies);
}); 

$("#button").click(function() {
  $("html").animate({ scrollTop: 0 }, "slow");
  });