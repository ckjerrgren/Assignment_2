
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

function getFiveMeals (search = 'chicken') {}

