import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock, getUserData, getFavoritesAmount, User } from './user.js'
import { renderToast } from './lib.js'
import {search} from './search.js'

// записываем данные в LocalStorage
const userToStorage = {userName: 'Wade Warren', avatarUrl: '/img/avatar.png'}
localStorage.setItem('user',JSON.stringify(userToStorage));
localStorage.setItem('favoritesAmount', '3')

window.addEventListener('DOMContentLoaded', () => {
  const user: User = getUserData()
  renderUserBlock(user.userName,user.avatarUrl, getFavoritesAmount())
  renderSearchFormBlock()
  // renderSearchFormBlock(new Date('2022-11-25'), new Date('2022-11-27'))
  renderSearchStubBlock()
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  )
  const button = document.getElementById('search-button')
  button.onclick = search
})
