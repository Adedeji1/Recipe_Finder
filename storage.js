const STORAGE_KEY = "favoriteRecipes";

function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function toggleFavorite(recipe) {
  let favorites = getFavorites();
  const exists = favorites.find(r => r.idMeal === recipe.idMeal);

  if (exists) {
    favorites = favorites.filter(r => r.idMeal !== recipe.idMeal);
  } else {
    favorites.push(recipe);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}