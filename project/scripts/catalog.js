// ==========================================================
// catalog.js - catalog page: cards, type filters, search and favorites
// (uses universeObjects from data.js and the favorites functions from common.js)
// ==========================================================

// ---------- Elements from the page ----------
const grid = document.querySelector("#catalog-grid");           // where the cards go
const searchInput = document.querySelector("#search");           // text search field
const filterButtons = document.querySelectorAll(".filter-btn");  // all filter buttons
const noResults = document.querySelector("#no-results");         // "no matches" message

// ---------- State ----------
// Remembers which type is selected: "all", "planet", "star" or "galaxy"
let currentType = "all";

// ---------- Rendering ----------
// Turn a list of objects into HTML cards and show them in the grid
function renderCards(list) {
    // Ids saved as favorites, so every star starts in the right state
    const favorites = getFavorites();

    // map() turns each object into a string of HTML
    // join("") glues all the strings together without commas between them
    grid.innerHTML = list.map(obj => {
        const isFavorite = favorites.includes(obj.id);

        // Filled star for favorites, empty star for the rest
        let star = "☆";
        if (isFavorite) {
            star = "★";
        }

        return `
        <article class="card">
            <img src="${obj.image}" alt="${obj.alt}" loading="lazy" width="300" height="200">
            <div class="card-body">
                <div class="card-title">
                    <h2>${obj.name}</h2>
                    <button type="button" class="fav-btn" data-id="${obj.id}"
                        aria-pressed="${isFavorite}" aria-label="Favorite ${obj.name}">${star}</button>
                </div>
                <p class="type">${obj.type}</p>
                <p>${obj.fact}</p>
            </div>
        </article>`;
    }).join("");

    // Show the "no results" message only when the list is empty
    noResults.hidden = list.length > 0;

    // The buttons were just created, so they need their click events again
    addStarEvents();
}

// ---------- Favorites ----------
// Give every star button a click event that saves or removes the favorite
function addStarEvents() {
    const starButtons = document.querySelectorAll(".fav-btn");

    starButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Read the object id stored in the data-id attribute of the button
            const id = button.getAttribute("data-id");

            // Save or remove it. The function tells us if it is now a favorite
            const isFavorite = toggleFavorite(id);

            // Update the button so it matches the new state
            button.setAttribute("aria-pressed", isFavorite);
            if (isFavorite) {
                button.textContent = "★";
            } else {
                button.textContent = "☆";
            }
        });
    });
}

// ---------- Filtering ----------
// Combine the type filter and the search text, then draw the cards again
function applyFilters() {
    // trim() removes extra spaces and toLowerCase() ignores capital letters
    const text = searchInput.value.trim().toLowerCase();

    // filter() keeps only the objects for which we return true
    const result = universeObjects.filter(obj => {
        // True when "all" is selected or the object has the selected type
        const matchesType = currentType === "all" || obj.type === currentType;

        // True when the name contains the text typed in the search field
        const matchesText = obj.name.toLowerCase().includes(text);

        return matchesType && matchesText;
    });

    renderCards(result);
}

// ---------- Events ----------
// When a filter button is clicked: save its type, highlight it and redraw
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Read the type stored in the data-type attribute of the button
        currentType = button.getAttribute("data-type");

        // Remove the "active" class from all the buttons, then add it to this one
        filterButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        applyFilters();
    });
});

// The "input" event runs every time the text in the search field changes
searchInput.addEventListener("input", applyFilters);

// ---------- Start ----------
// Draw all the cards when the page loads
applyFilters();
