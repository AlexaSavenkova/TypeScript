import {SearchFormData} from './search-form-data.js'
import {Place} from './place.js'
import {renderSearchResultsBlock} from './search-results.js'

function dateToUnixStamp(date) {
  return date.getTime() / 1000
}

function responseToJson(requestPromise) {
  return requestPromise
    .then((response) => {
      return response.text()
    })
    .then((response) => {
      return JSON.parse(response)
    })
}

export async function search(event) {
  event.preventDefault()
  const city = (document.getElementById('city') as HTMLInputElement).value
  const checkInDate = new Date((document.getElementById('check-in-date') as HTMLInputElement).value)
  const checkOutDate = new Date((document.getElementById('check-out-date') as HTMLInputElement).value)
  let maxPrice = Number((document.getElementById('max-price') as HTMLInputElement).value)
  if (maxPrice === 0) maxPrice = null
  const data: SearchFormData = {city, checkInDate, checkOutDate, maxPrice}
  const result: Place[] = await getData(data)
  renderSearchResultsBlock(result)
}

function getData (data: SearchFormData) {
  const {checkInDate, checkOutDate, maxPrice} = data
  let url = `http://localhost:3030/places?` +
    `checkInDate=${dateToUnixStamp(checkInDate)}&` +
    `checkOutDate=${dateToUnixStamp(checkOutDate)}&` +
    `coordinates=59.9386,30.3141`

  if (maxPrice != null) {
    url += `&maxPrice=${maxPrice}`
  }

  return responseToJson(fetch(url))

}
