// ==========================================================
// index.js - home page: "Day Data" and "Your Favorites"
// (uses universeObjects from data.js and getFavorites from common.js)
// ==========================================================

// ---------- Elements from the page ----------
const dayData = document.querySelector("#day-data");
const favoritesList = document.querySelector("#list");

// ---------- Day Data ----------
// Pick one object per day: the day of the month (1-31) divided by the
// number of objects. The remainder (%) is always a valid array index
function getDayObject() {
    const dayNumber = new Date().getDate();
    const index = dayNumber % universeObjects.length;
    return universeObjects[index];
}

// Build the card HTML with a template literal and show it
function showDayData() {
    const obj = getDayObject();

    dayData.innerHTML = `
        <img src="${obj.image}" alt="${obj.alt}" width="300" height="200">
        <div>
            <h3>${obj.name}</h3>
            <p class="type">${obj.type}</p>
            <p>${obj.fact}</p>
        </div>`;
}

// ---------- Favorites ----------
// Show the saved favorites, or a message when there are none yet
function showFavorites() {
    // Ids saved by the star buttons in the catalog
    const favoriteIds = getFavorites();

    // Keep only the objects whose id is in the saved list
    const favoriteObjects = universeObjects.filter(obj => favoriteIds.includes(obj.id));

    if (favoriteObjects.length === 0) {
        // Nothing saved yet: show a message with a link to the catalog
        favoritesList.innerHTML = `
            <li class="empty">No favorites yet. Visit the <a href="catalog.html">catalog</a> to add some.</li>`;
    } else {
        // One list item for each favorite
        favoritesList.innerHTML = favoriteObjects.map(obj => `
            <li>
                <span>${obj.name}</span>
                <span class="type">${obj.type}</span>
            </li>`).join("");
    }
}

// ---------- Start ----------
showDayData();
showFavorites();
