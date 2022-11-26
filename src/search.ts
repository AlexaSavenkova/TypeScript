import {SearchFormData} from './search-form-data.js'

export function search(event) {
  event.preventDefault()
  const city = (document.getElementById('city') as HTMLInputElement).value
  const checkInDate = new Date((document.getElementById('check-in-date') as HTMLInputElement).value)
  const checkOutDate = new Date((document.getElementById('check-out-date') as HTMLInputElement).value)
  const maxPrice = Number((document.getElementById('max-price') as HTMLInputElement).value)
  const data: SearchFormData = {city, checkInDate, checkOutDate, maxPrice}
  getData(data)
}

function getData (data: SearchFormData) {
  console.log(data.city, data.checkInDate.toLocaleDateString(), data.checkOutDate.toLocaleDateString(), data.maxPrice)
}
