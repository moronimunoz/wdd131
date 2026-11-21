// ==========================================================
// common.js - code shared by ALL pages (loaded on every page)
// ==========================================================

// ---------- Footer ----------
// Show the date the page file was last modified
const lastModified = document.querySelector("#last-modified");
lastModified.textContent = document.lastModified;

// ---------- Hamburger menu ----------
const menuButton = document.querySelector("#menu");
const navList = document.querySelector("#nav-list");

// When the button is clicked, open or close the navigation list
menuButton.addEventListener("click", () => {
    // toggle() adds the "open" class if it is missing and removes it if it is there
    navList.classList.toggle("open");

    // Tell screen readers if the menu is now open or closed
    if (navList.classList.contains("open")) {
        menuButton.setAttribute("aria-expanded", "true");
    } else {
        menuButton.setAttribute("aria-expanded", "false");
    }
});

// ---------- Favorites (saved in localStorage) ----------

// Read the saved favorite ids.
// The first time nothing is saved, so getItem returns null and
// the "|| []" part gives us an empty array instead
function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

// Add the id to the favorites if it is not there, remove it if it is.
// Returns true if the object is now a favorite, false if it was removed
function toggleFavorite(id) {
    let favorites = getFavorites();
    let isNowFavorite = false;

    if (favorites.includes(id)) {
        // Already a favorite: keep every id except this one
        favorites = favorites.filter(favoriteId => favoriteId !== id);
    } else {
        // Not a favorite yet: add it to the list
        favorites.push(id);
        isNowFavorite = true;
    }

    // localStorage only saves text, so turn the array into text first
    localStorage.setItem("favorites", JSON.stringify(favorites));

    return isNowFavorite;
}

// ---------- Observations (saved in localStorage) ----------

// Read the saved observations (an empty array if there are none yet)
function getObservations() {
    return JSON.parse(localStorage.getItem("observations")) || [];
}
