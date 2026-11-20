// 1. Footer: show the last modification date
document.querySelector("#last-modified").textContent = document.lastModified;

// 2. Hamburger menu: open and close the navigation
const menuButton = document.querySelector("#menu");
const navList = document.querySelector("#nav-list");

menuButton.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});

// ---------- Favorites (saved in localStorage) ----------

// Read the saved favorite ids. getItem returns null the first time
// (nothing saved yet), so "|| []" falls back to an empty array
function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

// Add the id if it is not saved, remove it if it is.
// Returns true when the object is now a favorite, false when it was removed
function toggleFavorite(id) {
    let favorites = getFavorites();
    const isNowFavorite = !favorites.includes(id);

    if (isNowFavorite) {
        favorites.push(id);
    } else {
        favorites = favorites.filter(favoriteId => favoriteId !== id);
    }

    // localStorage only stores text, so convert the array with JSON.stringify
    localStorage.setItem("favorites", JSON.stringify(favorites));

    return isNowFavorite;
}