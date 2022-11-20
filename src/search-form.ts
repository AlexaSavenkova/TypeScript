import { renderBlock } from './lib.js'

const dateToString = (date: Date): string => {
  let day = date.getDate().toString()
  if (day.length < 2 ) day = '0' + day
  let month = (date.getMonth() + 1).toString()
  if (month.length < 2 ) month = '0' + month
  const year = date.getFullYear().toString()
  return `${year}-${month}-${day}`
}

const getDateFromToday = (numberOfDays: number): Date => {
  const date = new Date()
  date.setDate(date.getDate() + numberOfDays)
  return date
}

export function renderSearchFormBlock (checkInDate: Date = getDateFromToday(1), checkOutDate: Date = getDateFromToday(3)) {
  const today: Date = new Date()
  const minDate: string  = dateToString(today)
  const maxDate: string  = dateToString(new Date(today.getFullYear(), today.getMonth() + 2, 0))
  const checkIn: string = dateToString(checkInDate)
  const checkOut: string = dateToString(checkOutDate)

  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${checkIn}" min="${minDate}" max="${maxDate}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${checkOut}" min="${minDate}" max="${maxDate}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}
