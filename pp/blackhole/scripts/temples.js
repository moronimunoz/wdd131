// select the DOM elements for output
const year = document.querySelector("#currentyear");
document.getElementById("lastModified").textContent = document.lastModified;


// use the date object
const today = new Date();
year.innerHTML = `${today.getFullYear()}`;

// Hamburger Menu
const menuButton = document.querySelector("#menu");
const navList = document.querySelector("#nav-list");

menuButton.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    menuButton.textContent = isOpen ? "✕" : "☰";
    menuButton.setAttribute("aria-expanded", isOpen);
});