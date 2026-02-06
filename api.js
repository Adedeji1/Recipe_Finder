const API_BASE = "https://www.themealdb.com/api/json/v1/1";

async function fetchRecipesByName(name) {
  const res = await fetch(`${API_BASE}/search.php?s=${name}`);
  const data = await res.json();
  return data.meals;
}

async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories.php`);
  const data = await res.json();
  return data.categories;
}

async function fetchRecipeById(id) {
  const res = await fetch(`${API_BASE}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals[0];
}