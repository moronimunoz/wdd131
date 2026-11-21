// ==========================================================
// logbook.js - observation form: fills the select, sets the date
// and saves each observation in localStorage
// (uses universeObjects from data.js and getObservations from common.js)
// ==========================================================

// ---------- Elements from the page ----------
const form = document.querySelector("#logbook-form");
const objectSelect = document.querySelector("#object");
const dateInput = document.querySelector("#ob-date");
const messageInput = document.querySelector("#message");
const nameInput = document.querySelector("#name");
const equipmentBoxes = document.querySelectorAll("input[name='equipment']"); // checkboxes
const ratingRadios = document.querySelectorAll("input[name='rating']");        // radio buttons

// ---------- Date ----------
// Return today's date as "YYYY-MM-DD" using the local time.
// (toISOString uses UTC time and could show tomorrow's date at night)
function getToday() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1; // months start at 0, so we add 1
    let day = now.getDate();

    // The date field needs two digits: "7" must become "07"
    if (month < 10) {
        month = `0${month}`;
    }
    if (day < 10) {
        day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
}

// Start with today's date and do not allow dates in the future
function setupDateField() {
    const today = getToday();
    dateInput.value = today;
    dateInput.max = today;
}

// ---------- Object select ----------
// Fill the select with one option for each object in data.js
function fillObjectSelect() {
    const options = universeObjects.map(obj =>
        `<option value="${obj.id}">${obj.name}</option>`
    ).join("");

    // The first option is a disabled hint with an empty value,
    // so the "required" attribute forces the user to choose a real object
    objectSelect.innerHTML = `
        <option value="" disabled selected>Select an object...</option>
        ${options}`;
}

// ---------- Saving ----------
// The "submit" event only runs when the form is valid.
// We save the observation here, then the browser goes to logbook-review.html
form.addEventListener("submit", () => {
    // Collect the equipment names of every checked checkbox
    const equipment = [];
    equipmentBoxes.forEach(box => {
        if (box.checked) {
            equipment.push(box.value);
        }
    });

    // Find the selected radio button (its value is text, so we use Number)
    let rating = 0;
    ratingRadios.forEach(radio => {
        if (radio.checked) {
            rating = Number(radio.value);
        }
    });

    // Group everything in one object
    const observation = {
        objectId: objectSelect.value,
        date: dateInput.value,
        equipment: equipment,
        rating: rating,
        message: messageInput.value,
        name: nameInput.value
    };

    // Add it to the saved list and store the whole list again as text
    const observations = getObservations();
    observations.push(observation);
    localStorage.setItem("observations", JSON.stringify(observations));
});

// ---------- Start ----------
setupDateField();
fillObjectSelect();
