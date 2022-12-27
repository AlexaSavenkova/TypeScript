export function saveToStorage<T extends string | object>(key: string, data: T) {
  if (typeof data === 'object')  {
    localStorage.setItem(key, JSON.stringify(data))
  } else {
    localStorage.setItem(key, data)
  }
}
