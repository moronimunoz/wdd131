// Set today's date as the default in the date field
const today = new Date().toISOString().split("T")[0];
document.querySelector("#ob-date").value = today;