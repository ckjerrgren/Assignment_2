
/*
* ?s= betyder att jag söker efter måltider baserat på ett namn eller bokstav.
 */

const API_BASE = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

// Här undert använder jag async / await för att vänta på data ifrån API:n utan att blockera resteb av sidan.
// Fetch skickar förfrågan och await response omvndlar till javascript.

async function fetchMeals (search = 'chicken') {
    try {
        const url = API_BASE + encodeURIComponent(search);
        console.log(`fetching meals for ${url}`);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Could not find meals for ${url}`);
        const json = await response.json();
        return json.meals || [];
    } catch (err) {
        console.error(`fetchMeals error`, err);
        return [];
    }
}


// Hämta fem första måltiderna alfabetiskt
// map hämtar bara strMeal namnetfrån varje måltid.
// sort ordnar dem alfabetiskt.
// slice(0, 5) tar de första fem.

function getFiveMeals (meals) {
    const first5 = meals
        .map(m => m.strMeal)
        .sort((a, b) => a.localeCompare(b))
        .slice(0, 5);
    console.log('first5 meals', first5);
}


// Måltider efter kategori
// Filter / filtrerar efter kategori
// to.lowerCase för att slippa tänka på hur ordet srivs.

function getMealsByCategory (meals, category) {
    const filtered = meals.filter(m =>  {
        const cat = (m.strCategory || '').toLowerCase();
        return cat === category.toLowerCase();
    });
    console.log(`Meals in category "${category}":`);
    filtered.forEach(m => console.log(`- ${m.strMeal} (${m.strCategory})`));

}

// Antal måltider per kategori
// reduce() börjar med ett tomt objekt {}.
// För varje måltid tittar den på strCategory.
// Om kategorin redan finns, ökar den värdet med 1.
// Annars skapas ny nyckel i objektet.


function countMealsByCategory (meals) {
    const counts = meals.reduce((acc, meal) => {
        const cat = meal.strCategory ||'Unknown';
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
    }, {});
    console.log(`Counting meals by category` , counts);
    return counts;
}

// VG DEL
// Listan sorteras efter nyckeln strCategory resultatet (output) blir ett objekt där varje nycklel innehåller en array av måltider i den katagorin.
function groupBy(items, key) {
    return items.reduce((acc, item) => {
        const k = item[key] || 'Unknown';
        acc[k] = acc[k] || [];
        acc[k].push(item);
        return acc;
    }, {});
}


// VG 2
// Varje måltid sammanfattas i ett objekt och vi plockar ut information om bland annat
//              id: m.idMeal,
//             name: m.strMeal,
//             category: m.strCategory,
//             area: m.strArea,
//             ingredients

function mapMealsToSummary(meals) {
    return meals.map(m => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ing = m[`strIngredient${i}`];
            if (ing && ing.trim()) ingredients.push(ing.trim());
        }
        return {
            id: m.idMeal,
            name: m.strMeal,
            category: m.strCategory,
            area: m.strArea,
            ingredients
        };
    });
}

// VG 3
// flatMap() hämtar alla ingredienser från varje måltid och slår ihop dem till en lista.
// reduce() räknar hur ofta varje ingrediens förekommer.
function countIngredientsFrequency(meals) {
    const allIngredients = meals.flatMap(m => {
        const ings = [];
        for (let i = 1; i <= 20; i++) {
            const ing = m[`strIngredient${i}`];
            if (ing && ing.trim()) ings.push(ing.trim().toLowerCase());
        }
        return ings;
    });
    const freq = allIngredients.reduce((acc, ing) => {
        acc[ing] = (acc[ing] || 0) + 1;
        return acc;
    }, {});
    console.log('Ingredient frequency map (lowercased):', freq);
    return freq;
}



// Huvudflöde

(async function main() {
    const meals = await fetchMeals('a');
    if (!meals.length) {
        console.log('No meals found for that search.');
        return;
    }

    getFiveMeals(meals);
    getMealsByCategory(meals, 'Seafood');
    countMealsByCategory(meals);

    const groups = groupBy(meals, 'strCategory');
    console.log('groupBy(strCategory) keys sample:', Object.keys(groups).slice(0, 10));

    const summaries = mapMealsToSummary(meals);
    console.log('First 5 summaries:', summaries.slice(0, 5));

    countIngredientsFrequency(meals);

    console.log('--- DONE (Assignment 2) ---');
})();