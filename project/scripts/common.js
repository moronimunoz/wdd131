// 1. Footer: show the last modification date
document.querySelector("#last-modified").textContent = document.lastModified;

// 2. Hamburger menu: open and close the navigation
const menuButton = document.querySelector("#menu");
const navList = document.querySelector("#nav-list");

menuButton.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});