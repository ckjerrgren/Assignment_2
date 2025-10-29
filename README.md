# Assignment_2
fetch, async/await, API, JSON, and core array methods


 Overview
This project demonstrates how to:
- Fetch and parse JSON data from a public API.
- Transform and analyze the data using array methods like:
  `map`, `filter`, `reduce`, `flatMap`, `sort`, and `slice`.
- Log results to the console (no UI required).

The project uses TheMealDB API:  
https://www.themealdb.com/api.php



How to run 
1. Clone or download the repository.  
2. Open `index.html` in your browser.  
3. Open the Console in DevTools to view results.



Code Flow Explanation

 Fetching Data
`fetchMeals(search)`
- Uses `fetch()` with async/await to get data from TheMealDB.  
- Converts the response to JSON.  
- Returns an array of meal objects (or an empty array if none found).

Transforming Data
- `getFiveMeals(meals)`** → Uses `map`, `sort`, and `slice` to list the first 5 meal names alphabetically.  
- `getMealsByCategory(meals, category)`** → Uses `filter` to list meals from a given category (case-insensitive).  
- `countMealsByCategory(meals)`** → Uses `reduce` to count how many meals exist per category.

 VG Goals
- `groupBy(items, key)`** → Groups meals by a key (e.g. `strCategory`) using `reduce`.  
- `mapMealsToSummary(meals)`** → Maps meals to compact summaries with ID, name, category, and ingredients.  
- `countIngredientsFrequency(meals)`** → Uses `flatMap` + `reduce` to count how often each ingredient appears.

Main Flow
The `main()` function:
1. Fetches meals from the API (`fetchMeals('a')`).  
2. Runs all required tasks in order.  
3. Prints all results to the console.

---

