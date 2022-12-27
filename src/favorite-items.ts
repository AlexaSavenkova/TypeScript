import {Place} from './place.js'
import {saveToStorage} from './storage.js'
import {getUserData, renderUserBlock, User} from './user.js'

type PlacesForStorage = Pick<Place, 'id' | 'name' | 'image'>

export interface FavoriteItems {
  [key: string] : PlacesForStorage
}

export function getFavoriteItems(): FavoriteItems {
  return JSON.parse(localStorage.getItem('favoriteItems'))
}

export function setFavoriteItems(data: FavoriteItems): void {
  localStorage.setItem('favoriteItems',JSON.stringify(data))
}

export function getFavoritesAmount ():number {
  return Object.keys(getFavoriteItems()).length
}

export function toggleFavoriteItem(event) {
  if (!event.target.classList.contains('favorites')) return

  let favoriteItems = getFavoriteItems()

  if (event.target.classList.contains('active')) {
    event.target.classList.remove('active')
    delete favoriteItems[event.target.dataset.id]
  } else {
    event.target.classList.add('active')
    favoriteItems[event.target.dataset.id] = {
      id: event.target.dataset.id,
      name: event.target.dataset.name,
      image: event.target.dataset.image
    }
  }

  // обновляем ключ favoriteItems в localStorage
  saveToStorage('favoriteItems', favoriteItems)

  // перерисовываем шапку
  const user: User = getUserData()
  renderUserBlock(user.userName,user.avatarUrl, getFavoritesAmount())
}

 export function isFavorite(id: number): boolean {
   const favoriteItems = getFavoriteItems()
   return !!favoriteItems[id]
 }


