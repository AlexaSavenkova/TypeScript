import {renderBlock} from './lib.js'

export interface User {
  userName: string
  avatarUrl: string
}

export function renderUserBlock(userName: string, avatarUrl: string, favoriteItemsAmount: number = 0) {
  const favoritesCaption = favoriteItemsAmount > 0 ? String(favoriteItemsAmount) : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount > 0 ? true : false

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatarUrl}" alt="${userName}" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
function validateUser (user: unknown): User {
  if (typeof user === 'object') {
    let userName, avatarUrl: string
    if (('userName' in user ) && (typeof user.userName === 'string')) {
      userName = user.userName
    } else {
      userName = 'Guest'
    }
    if (('avatarUrl' in user) && (typeof user.avatarUrl === 'string')) {
      avatarUrl = user.avatarUrl
    } else {
      avatarUrl = '/img/avatar.png'
    }
    return {userName, avatarUrl}
  }

  return {userName:'Guest', avatarUrl: '/img/avatar.png'}
}


export function getUserData (): User {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    return validateUser(user)
  } catch {
    return {userName:'Guest', avatarUrl: '/img/avatar.png'}
  }
}

