// select the DOM elements for output
const year = document.querySelector("#currentyear");
document.getElementById("lastModified").textContent = document.lastModified;


// use the date object
const today = new Date();
year.innerHTML = `${today.getFullYear()}`;
