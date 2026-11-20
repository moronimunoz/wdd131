// ---------- Elements from the page ----------
const form = document.querySelector("#logbook-form");
const objectSelect = document.querySelector("#object");
const dateInput = document.querySelector("#ob-date");

// ---------- Date ----------
// Return today's date as "YYYY-MM-DD" using the local time zone
// (toISOString would use UTC and could show tomorrow's date at night)
function getToday() {
    const now = new Date();
    const year = now.getFullYear();
    // getMonth() starts at 0, so add 1. padStart adds a leading zero ("7" -> "07")
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

// Default to today and do not allow future dates
function setupDateField() {
    const today = getToday();
    dateInput.value = today;
    dateInput.max = today;
}

// ---------- Object select ----------
// Fill the select with one option per object from data.js
function fillObjectSelect() {
    const options = universeObjects.map(obj =>
        `<option value="${obj.id}">${obj.name}</option>`
    ).join("");

    // The first option is a disabled placeholder with an empty value,
    // so "required" forces the user to pick a real object
    objectSelect.innerHTML = `
        <option value="" disabled selected>Select an object...</option>
        ${options}`;
}

// ---------- Saving ----------
// The "submit" event only fires when the form is valid.
// We save the observation here, and then the browser continues to logbook-review.html
form.addEventListener("submit", () => {
    // FormData reads every field of the form by its name attribute
    const data = new FormData(form);

    const observation = {
        objectId: data.get("object"),
        date: data.get("date"),
        equipment: data.getAll("equipment"), // getAll returns every checked box
        rating: Number(data.get("rating")),  // radio values are text, convert to number
        message: data.get("message"),
        name: data.get("name")
    };

    // Add it to the saved list and store the list again as text
    const observations = getObservations();
    observations.push(observation);
    localStorage.setItem("observations", JSON.stringify(observations));
});

// ---------- Start ----------
setupDateField();
fillObjectSelect();