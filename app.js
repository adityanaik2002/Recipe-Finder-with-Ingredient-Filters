// ===== Mock API data =====
// This simulates a structured API response for recipes with nutrition.
const MOCK_RECIPES = [
  {
    id: "r1",
    name: "Spicy Chickpea Curry",
    image:
      "https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: ["chickpeas", "onion", "garlic", "tomato", "curry powder"],
    instructions:
      "Saute onions and garlic, add spices and tomatoes, then simmer with chickpeas until thick and fragrant.",
    cookTimeMinutes: 30,
    servings: 2,
    tags: ["vegan", "high-protein", "one-pot"],
    nutrition: {
      calories: 420,
      protein: 18,
      carbs: 55,
      fats: 12,
    },
  },
  {
    id: "r2",
    name: "Creamy Mushroom Pasta",
    image:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: ["pasta", "mushroom", "garlic", "cream", "parmesan"],
    instructions:
      "Cook pasta, saute mushrooms with garlic, then add cream and cheese and toss with pasta.",
    cookTimeMinutes: 25,
    servings: 2,
    tags: ["comfort", "quick"],
    nutrition: {
      calories: 650,
      protein: 22,
      carbs: 70,
      fats: 26,
    },
  },
  {
    id: "r3",
    name: "Mediterranean Quinoa Salad",
    image:
      "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: ["quinoa", "cucumber", "tomato", "feta", "olive oil"],
    instructions:
      "Cook quinoa, cool it, then toss with chopped veggies, feta, and olive oil dressing.",
    cookTimeMinutes: 20,
    servings: 3,
    tags: ["salad", "light", "meal-prep"],
    nutrition: {
      calories: 350,
      protein: 14,
      carbs: 45,
      fats: 14,
    },
  },
  {
    id: "r4",
    name: "Grilled Chicken Bowl",
    image:
      "https://images.pexels.com/photos/4106483/pexels-photo-4106483.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: ["chicken", "rice", "broccoli", "soy sauce", "garlic"],
    instructions:
      "Marinate chicken, grill it, and serve over rice with steamed broccoli and soy-garlic drizzle.",
    cookTimeMinutes: 35,
    servings: 1,
    tags: ["high-protein", "meal-prep"],
    nutrition: {
      calories: 520,
      protein: 40,
      carbs: 55,
      fats: 12,
    },
  },
  {
    id: "r5",
    name: "Avocado Toast with Egg",
    image:
      "https://images.pexels.com/photos/5665662/pexels-photo-5665662.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: ["bread", "avocado", "egg", "lemon", "chili flakes"],
    instructions:
      "Toast bread, mash avocado with lemon, spread, then top with fried or poached egg.",
    cookTimeMinutes: 10,
    servings: 1,
    tags: ["breakfast", "quick"],
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 28,
      fats: 18,
    },
  },
];

// Unique ingredient list derived from mock recipes
const ALL_INGREDIENTS = Array.from(
  new Set(MOCK_RECIPES.flatMap((r) => r.ingredients))
).sort();

// ===== State =====
const state = {
  selectedIngredients: new Set(),
  savedRecipeIds: new Set(),
  filters: {
    maxTime: null,
    nameQuery: "",
  },
  recipes: [...MOCK_RECIPES],
};

// ===== DOM references =====
const chipsContainer = document.getElementById("ingredient-chips");
const searchBtn = document.getElementById("search-btn");
const clearFiltersBtn = document.getElementById("clear-filters-btn");
const maxTimeInput = document.getElementById("max-time-input");
const nameSearchInput = document.getElementById("name-search-input");

const recipesGrid = document.getElementById("recipes-grid");
const resultsCountLabel = document.getElementById("results-count");
const emptyStateEl = document.getElementById("empty-state");

const modal = document.getElementById("recipe-modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalContent = document.getElementById("modal-content");

// ===== Initialization =====
function init() {
  renderIngredientChips();
  attachEventListeners();
  applyFiltersAndRender();
}

// Render ingredient chips
function renderIngredientChips() {
  const fragment = document.createDocumentFragment();

  ALL_INGREDIENTS.forEach((ingredient) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.textContent = capitalize(ingredient);
    chip.className = "chip";
    chip.dataset.ingredient = ingredient;

    chip.addEventListener("click", () => {
      toggleIngredientSelection(ingredient, chip);
    });

    fragment.appendChild(chip);
  });

  chipsContainer.appendChild(fragment);
}

function toggleIngredientSelection(ingredient, chipEl) {
  if (state.selectedIngredients.has(ingredient)) {
    state.selectedIngredients.delete(ingredient);
    chipEl.classList.remove("selected");
  } else {
    state.selectedIngredients.add(ingredient);
    chipEl.classList.add("selected");
  }
}

// ===== Filtering logic =====
function applyFiltersAndRender() {
  const filtered = filterRecipes();
  renderRecipes(filtered);
  updateResultsCount(filtered.length);
  handleEmptyState(filtered.length === 0);
}

function filterRecipes() {
  const { maxTime, nameQuery } = state.filters;
  const selectedIngredients = state.selectedIngredients;

  return state.recipes.filter((recipe) => {
    // Ingredient filter: recipe must contain all selected ingredients
    if (selectedIngredients.size > 0) {
      const recipeIngredientsSet = new Set(recipe.ingredients);
      for (const ing of selectedIngredients) {
        if (!recipeIngredientsSet.has(ing)) {
          return false;
        }
      }
    }

    // Max time filter
    if (typeof maxTime === "number") {
      if (recipe.cookTimeMinutes > maxTime) return false;
    }

    // Name query filter
    if (nameQuery) {
      const normalizedName = recipe.name.toLowerCase();
      if (!normalizedName.includes(nameQuery.toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}

// ===== Rendering recipes =====
function renderRecipes(recipes) {
  recipesGrid.innerHTML = "";

  const fragment = document.createDocumentFragment();

  recipes.forEach((recipe) => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.dataset.id = recipe.id;

    card.innerHTML = `
      <div class="recipe-image-wrapper">
        <img
          src="${recipe.image}"
          alt="${escapeHtml(recipe.name)}"
          class="recipe-image"
          loading="lazy"
        />
        <div class="recipe-badge">
          ⏱ ${recipe.cookTimeMinutes} min • 🍽 ${recipe.servings} servings
        </div>
      </div>
      <div class="recipe-body">
        <h3 class="recipe-title">${escapeHtml(recipe.name)}</h3>
        <div class="recipe-meta">
          <span>🧬 ${recipe.ingredients.length} ingredients</span>
          <span>🔥 ${recipe.nutrition.calories} kcal</span>
        </div>

        <div class="recipe-tags">
          ${recipe.tags
            .map((tag) => `<span class="recipe-tag">${escapeHtml(tag)}</span>`)
            .join("")}
        </div>

        <div class="recipe-nutrition">
          <span>Protein: ${recipe.nutrition.protein}g</span>
          <span>Carbs: ${recipe.nutrition.carbs}g</span>
          <span>Fat: ${recipe.nutrition.fats}g</span>
        </div>

        <div class="recipe-footer">
          <button class="btn-details" data-action="details">
            View details
          </button>
          <button class="btn-save ${
            state.savedRecipeIds.has(recipe.id) ? "saved" : ""
          }" data-action="save">
            ${state.savedRecipeIds.has(recipe.id) ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    `;

    fragment.appendChild(card);
  });

  recipesGrid.appendChild(fragment);
}

function updateResultsCount(count) {
  resultsCountLabel.textContent = `${count} recipe${
    count === 1 ? "" : "s"
  } found`;
}

function handleEmptyState(isEmpty) {
  emptyStateEl.classList.toggle("hidden", !isEmpty);
}

// ===== Modal details =====
function openRecipeModal(recipe) {
  const ingredientList = recipe.ingredients
    .map((ing) => `<li>${escapeHtml(ing)}</li>`)
    .join("");

  modalContent.innerHTML = `
    <h2 class="modal-title">${escapeHtml(recipe.name)}</h2>
    <p class="modal-subtle">
      ⏱ ${recipe.cookTimeMinutes} min • 🍽 ${recipe.servings} servings
    </p>

    <div class="modal-meta">
      <span>🔥 ${recipe.nutrition.calories} kcal</span>
      <span>Protein: ${recipe.nutrition.protein}g</span>
      <span>Carbs: ${recipe.nutrition.carbs}g</span>
      <span>Fat: ${recipe.nutrition.fats}g</span>
    </div>

    <h3 class="modal-section-title">Ingredients</h3>
    <ul class="modal-list">
      ${ingredientList}
    </ul>

    <h3 class="modal-section-title">Instructions</h3>
    <p class="modal-instructions">
      ${escapeHtml(recipe.instructions)}
    </p>
  `;

  modal.classList.remove("hidden");
}

function closeRecipeModal() {
  modal.classList.add("hidden");
}

// ===== Event listeners =====
function attachEventListeners() {
  // Search button
  searchBtn.addEventListener("click", () => {
    syncFiltersFromInputs();
    applyFiltersAndRender();
  });

  // Clear filters
  clearFiltersBtn.addEventListener("click", () => {
    state.selectedIngredients.clear();
    state.filters.maxTime = null;
    state.filters.nameQuery = "";

    // Reset UI
    chipsContainer
      .querySelectorAll(".chip.selected")
      .forEach((chip) => chip.classList.remove("selected"));
    maxTimeInput.value = "";
    nameSearchInput.value = "";

    applyFiltersAndRender();
  });

  // Enter key triggers search for text inputs
  [maxTimeInput, nameSearchInput].forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        syncFiltersFromInputs();
        applyFiltersAndRender();
      }
    });
  });

  // Delegated events for recipe card buttons
  recipesGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const card = target.closest(".recipe-card");
    if (!card) return;

    const recipeId = card.dataset.id;
    const recipe = state.recipes.find((r) => r.id === recipeId);
    if (!recipe) return;

    const action = target.dataset.action;

    if (action === "details") {
      openRecipeModal(recipe);
    } else if (action === "save") {
      toggleSaveRecipe(recipeId, target);
    }
  });

  // Modal close
  modalBackdrop.addEventListener("click", closeRecipeModal);
  modalCloseBtn.addEventListener("click", closeRecipeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeRecipeModal();
    }
  });
}

function syncFiltersFromInputs() {
  const maxTimeValue = maxTimeInput.value.trim();
  state.filters.maxTime =
    maxTimeValue === "" ? null : Number.parseInt(maxTimeValue, 10);

  const nameQueryValue = nameSearchInput.value.trim();
  state.filters.nameQuery = nameQueryValue;
}

function toggleSaveRecipe(recipeId, buttonEl) {
  if (state.savedRecipeIds.has(recipeId)) {
    state.savedRecipeIds.delete(recipeId);
    buttonEl.classList.remove("saved");
    buttonEl.textContent = "Save";
  } else {
    state.savedRecipeIds.add(recipeId);
    buttonEl.classList.add("saved");
    buttonEl.textContent = "Saved";
  }
}

// ===== Utilities =====
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Start app
init();
