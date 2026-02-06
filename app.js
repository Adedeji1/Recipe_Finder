const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const errorText = document.getElementById("form-error");
const categorySelect = document.getElementById("category-filter");
const ingredientFilter = document.getElementById("ingredient-filter");

let currentRecipes = [];


fetchCategories().then(categories => {
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat.strCategory;
    option.textContent = cat.strCategory;
    categorySelect.appendChild(option);
  });
});


form.addEventListener("submit", async e => {
  e.preventDefault();

  if (input.value.trim().length < 2) {
    errorText.textContent = "Enter at least 2 characters";
    return;
  }

  errorText.textContent = "";
  showStatus("Loading recipes...");

  try {
    const recipes = await fetchRecipesByName(input.value);
    if (!recipes) {
      showStatus("No recipes found");
      return;
    }

    currentRecipes = recipes;
    showStatus("");
    applyFilters();
  } catch {
    showStatus("Something went wrong. Try again.");
  }
});


function applyFilters() {
  let filtered = [...currentRecipes];

  if (categorySelect.value) {
    filtered = filtered.filter(
      r => r.strCategory === categorySelect.value
    );
  }

  if (ingredientFilter.value) {
    filtered = filtered.filter(r =>
      r.strInstructions
        .toLowerCase()
        .includes(ingredientFilter.value.toLowerCase())
    );
  }

  renderRecipes(filtered);
}

categorySelect.addEventListener("change", applyFilters);
ingredientFilter.addEventListener("input", applyFilters);