// Containers where the content will be rendered
const dayData = document.querySelector("#day-data");
const favoritesList = document.querySelector("#list");

// Pick one object per day: the day of the month (1-31) modulo the array length
// always gives a valid index between 0 and length - 1
function getDayObject() {
    const dayNumber = new Date().getDate();
    const index = dayNumber % universeObjects.length;
    return universeObjects[index];
}

// Build the card HTML with a template literal and insert it in the page
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

// Show the saved favorites, or a hint when there are none yet
function showFavorites() {
    // getFavorites() comes from common.js and returns the saved ids
    const favoriteIds = getFavorites();

    // Keep only the objects whose id is in the saved list
    const favoriteObjects = universeObjects.filter(obj => favoriteIds.includes(obj.id));

    // Nothing saved yet: show a message with a link to the catalog and stop
    if (favoriteObjects.length === 0) {
        favoritesList.innerHTML = `
            <li class="empty">No favorites yet. Visit the <a href="catalog.html">catalog</a> to add some.</li>`;
        return;
    }

    // One list item per favorite
    favoritesList.innerHTML = favoriteObjects.map(obj => `
        <li>
            <span>${obj.name}</span>
            <span class="type">${obj.type}</span>
        </li>`).join("");
}

// Run once when the page loads
showDayData();
showFavorites();