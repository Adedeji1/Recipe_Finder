const recipesContainer = document.getElementById("recipes");
const statusText = document.getElementById("status");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");

function showStatus(text) {
  statusText.textContent = text;
}

function renderRecipes(recipes) {
  recipesContainer.innerHTML = "";

  recipes.forEach(recipe => {
    const div = document.createElement("div");
    div.className = "recipe-card";
    div.innerHTML = `
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
      <h3>${recipe.strMeal}</h3>
    `;

    div.addEventListener("click", () => openModal(recipe.idMeal));
    recipesContainer.appendChild(div);
  });
}

async function openModal(id) {
  const recipe = await fetchRecipeById(id);

  modalBody.innerHTML = `
    <h2>${recipe.strMeal}</h2>
    <img src="${recipe.strMealThumb}" width="100%">
    <p><strong>Category:</strong> ${recipe.strCategory}</p>
    <p>${recipe.strInstructions}</p>
    <button id="fav-btn">Save to Favorites</button>
  `;

  document.getElementById("fav-btn").onclick = () => toggleFavorite(recipe);

  modal.classList.remove("hidden");
}

document.getElementById("close-modal").onclick = () =>
  modal.classList.add("hidden");
