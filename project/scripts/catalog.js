// ---------- Elements from the page ----------
const grid = document.querySelector("#catalog-grid");          // where the cards go
const searchInput = document.querySelector("#search");          // text search field
const filterButtons = document.querySelectorAll(".filter-btn"); // all filter buttons
const noResults = document.querySelector("#no-results");        // "no matches" message

// ---------- State ----------
// Remembers which type filter is selected ("all", "planet", "star", "galaxy")
let currentType = "all";

// ---------- Rendering ----------
// Turn a list of objects into HTML cards and show them in the grid
function renderCards(list) {
    // Ids already saved, so each star starts in the right state
    const favorites = getFavorites();

    // map() transforms each object into a string of HTML
    // join("") glues all the strings together (without commas between them)
    grid.innerHTML = list.map(obj => {
        const isFavorite = favorites.includes(obj.id);

        return `
        <article class="card">
            <img src="${obj.image}" alt="${obj.alt}" loading="lazy" width="300" height="200">
            <div class="card-body">
                <div class="card-title">
                    <h2>${obj.name}</h2>
                    <button type="button" class="fav-btn" data-id="${obj.id}"
                        aria-pressed="${isFavorite}" aria-label="Favorite ${obj.name}">${isFavorite ? "★" : "☆"}</button>
                </div>
                <p class="type">${obj.type}</p>
                <p>${obj.fact}</p>
            </div>
        </article>`;
    }).join("");

    // Show the "no results" message only when the list is empty
    noResults.hidden = list.length > 0;
}

// ---------- Filtering ----------
// Combine the type filter and the search text, then redraw the cards
function applyFilters() {
    // trim() removes extra spaces, toLowerCase() makes the search case-insensitive
    const text = searchInput.value.trim().toLowerCase();

    // filter() keeps only the objects where the condition is true:
    // the type matches (or "all" is selected) AND the name contains the search text
    const result = universeObjects.filter(obj =>
        (currentType === "all" || obj.type === currentType) &&
        obj.name.toLowerCase().includes(text)
    );

    renderCards(result);
}

// ---------- Events ----------
// When a filter button is clicked: save its type, highlight it, and redraw
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // dataset.type reads the data-type attribute from the HTML
        currentType = button.dataset.type;

        // Remove the "active" style from all buttons, then add it to the clicked one
        filterButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        applyFilters();
    });
});

// "input" fires on every keystroke in the search field
searchInput.addEventListener("input", applyFilters);

// Event delegation: one listener on the grid handles every star button.
// The cards are recreated on each filter, so listeners placed directly
// on the buttons would be lost
grid.addEventListener("click", (event) => {
    // closest() finds the star button even if the click landed inside it
    const button = event.target.closest(".fav-btn");
    if (!button) return; // the click was somewhere else in the grid

    // Save or remove the favorite, then update only this button
    const isFavorite = toggleFavorite(button.dataset.id);
    button.setAttribute("aria-pressed", isFavorite);
    button.textContent = isFavorite ? "★" : "☆";
});

// ---------- Start ----------
// Draw all the cards when the page loads
applyFilters();