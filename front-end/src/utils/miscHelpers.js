
export function formatDate(date) {
  return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
}

export function getCategoryIdFromName(categories, name) {
  // categories input is an array of Category objects
  return categories.find(element => element.name === name).id
}

export function getCategoryNameFromId(categories, id) {
  // categories input is an array of Category objects
  return categories.find(element => element.id === id).name
}
