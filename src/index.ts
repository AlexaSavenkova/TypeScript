import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock, getUserData, User } from './user.js'
import {getFavoritesAmount, toggleFavoriteItem} from './favorite-items.js'
import { renderToast } from './lib.js'
import {search} from './search.js'
import {saveToStorage} from './storage.js'

// записываем данные в LocalStorage
const userToStorage = {userName: 'Wade Warren', avatarUrl: '/img/avatar.png'}
saveToStorage('user', userToStorage)
const favoriteItemsToStorage = {1: {id: 1, name: 'YARD Residence Apart-hotel', image: 'http://localhost:3030/img/1.png'}, 2: {id: 2, name: 'Akyan St.Petersburg', image: 'http://localhost:3030/img/2.png'}}
saveToStorage('favoriteItems', favoriteItemsToStorage)

window.addEventListener('DOMContentLoaded', () => {
  const user: User = getUserData()
  renderUserBlock(user.userName,user.avatarUrl, getFavoritesAmount())
  renderSearchFormBlock()
  renderSearchStubBlock()
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  )
  const button = document.getElementById('search-button')
  button.onclick = search

  const searchResultsblock = document.getElementById('search-results-block')
  searchResultsblock.addEventListener('click', toggleFavoriteItem)
})
