import {renderBlock} from './lib.js'
import {SearchFormData} from './search-form-data.js'
import {Place} from './place.js'
import {isFavorite} from './favorite-items.js'


export function searchResults(data: SearchFormData) {
  console.log(data)
}

export function renderSearchStubBlock() {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock(reasonMessage) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function renderSearchResultsBlock(data: Place[]) {
  let html = `
  <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
  `
  data.forEach((place) => {
    const favoriteActive = isFavorite(place.id) ? ' active' : ''
    html += `
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div 
                class="favorites${favoriteActive}"
                data-id="${place.id}"
                data-name="${place.name}"
                data-image="${place.image}"
                >
            </div>
            <img class="result-img" src="${place.image}" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${place.name}</p>
              <p class="price">${place.price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> ${place.remoteness}км от вас</div>
            <div class="result-info--descr">${place.description}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
  `
    }
  )
  html += '</ul>'

  renderBlock(
    'search-results-block', html
  )
}
