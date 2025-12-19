***

# Recipe Finder with Ingredient Filters

Discover what you can cook **right now** with the ingredients you already have.  
Recipe Finder with Ingredient Filters is a modern, responsive web app built using **HTML, CSS, and vanilla JavaScript** that allows users to filter recipes by selected ingredients, cook time, and recipe name.

***

## Features

- **Ingredient-based filtering**  
  Select one or more ingredients using interactive chips to instantly narrow down matching recipes.

- **Smart filters**  
  - Filter by **maximum cook time** (in minutes).  
  - Search recipes by **name or keyword**.

- **Beautiful recipe cards**  
  Each recipe is displayed as a visual card with:  
  - High-quality image  
  - Title and tags (for example, vegan, high-protein, quick)  
  - Cook time and servings  
  - Basic nutrition info: calories, protein, carbs, fats.

- **Recipe details modal**  
  Click “View details” to open a modal showing:  
  - Full ingredient list  
  - Cooking instructions  
  - Nutrition overview.

- **Save your favorites**  
  Mark recipes as Saved with a single click for quick access during a session.

- **Responsive UI**  
  Layout designed with CSS Grid and Flexbox to look great on mobile, tablet, and desktop.

- **Clean, modular JavaScript**  
  Separation of concerns between:  
  - State management  
  - Filtering logic  
  - DOM rendering  
  - Modal and interaction handlers.

***

## Tech Stack

- **HTML5** – semantic structure and accessible components.
- **CSS3** – responsive layout, modern styling, and UI polish.
- **JavaScript (ES6+)** – modular logic, DOM manipulation, and filtering.
- **Mock API data** – local structured dataset that mimics a real REST API.

***

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Recipe-Finder-with-Ingredient-Filters.git
cd Recipe-Finder-with-Ingredient-Filters
```

### 2. Open the app

No build step required.

```bash
# On most systems you can simply open index.html
# Option 1: Double-click index.html
# Option 2: Use a simple local server
npx serve .
```

Then visit:

```text
http://localhost:8000
```

***

## How to Use

1. **Select ingredients**  
   - Click on the ingredient chips (for example, Tomato, Garlic, Chicken).  
   - Selected chips are highlighted.

2. **Refine with extra filters (optional)**  
   - Enter Max cook time (minutes).  
   - Type a recipe name or keyword like pasta or salad.

3. **Search recipes**  
   - Click Search Recipes to apply filters.  
   - Matching recipes are shown as cards in the grid.

4. **View full details**  
   - Click View details on any card to open the recipe modal.  
   - Read ingredients and instructions.

5. **Save a recipe**  
   - Click Save on a card to mark it as a favorite for this session.

6. **Reset everything**  
   - Click Clear Filters to reset ingredient selections and input fields.

***

## Project Structure

```text
.
├── index.html     # Main HTML page and layout
├── styles.css     # Styling, layout, and responsive design
└── app.js         # Mock data, filtering logic, and UI interactions
```

***

## Implementation Highlights

- **Ingredient filter logic**  
  - A recipe must contain all selected ingredients to match.  
  - Filters are combined with cook time and name search for precise results.

- **Mock API approach**  
  - Recipes are defined as structured JavaScript objects.  
  - The data design makes it easy to swap in a real API later (for example, public recipe APIs).

- **Maintainable code structure**  
  - Functions such as `filterRecipes`, `renderRecipes`, `openRecipeModal`, and `toggleSaveRecipe` keep logic modular and readable.  
  - State is tracked with simple in-memory structures for clarity.

***

## Possible Improvements

Some ideas you or contributors can explore next:

- Integrate a real recipe API instead of mock data  
- Add dietary filters (vegan, vegetarian, gluten-free, high-protein, etc.)  
- Implement pagination or infinite scroll for large recipe sets  
- Persist saved recipes using localStorage  
- Add dark/light mode toggle  
- Support multilingual UI text.

***

## Contributing

Contributions, ideas, and suggestions are welcome.

1. Fork the repository  
2. Create a feature branch  
3. Commit your changes  
4. Open a pull request describing your improvements.

***

## License

This project is available under the MIT License.  
You are free to use, modify, and share it in your own projects.

