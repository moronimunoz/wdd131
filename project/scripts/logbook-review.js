// ==========================================================
// logbook-review.js - shows a summary of the last saved observation
// (uses universeObjects from data.js and getObservations from common.js)
// ==========================================================

// ---------- Elements from the page ----------
const reviewCard = document.querySelector("#review");
const emptyMessage = document.querySelector("#review-empty");
const totalText = document.querySelector("#review-total");

const objectText = document.querySelector("#r-object");
const dateText = document.querySelector("#r-date");
const equipmentText = document.querySelector("#r-equipment");
const ratingText = document.querySelector("#r-rating");
const messageText = document.querySelector("#r-message");
const nameText = document.querySelector("#r-name");

// ---------- Rendering ----------
// Nothing saved yet: hide the summary and show a hint
function showEmptyState() {
    reviewCard.hidden = true;
    totalText.hidden = true;
    emptyMessage.hidden = false;
}

// Build the rating as stars, for example 4 -> "★★★★☆"
function getStars(rating) {
    let stars = "";

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars = `${stars}★`;
        } else {
            stars = `${stars}☆`;
        }
    }

    return stars;
}

// Fill the summary with the last observation of the list
function showObservation(observations) {
    // The last item of the array is the observation just recorded
    const last = observations[observations.length - 1];

    // The observation only stores the object id, so we look for the full object
    const matches = universeObjects.filter(item => item.id === last.objectId);
    const obj = matches[0]; // undefined if nothing matched

    // textContent shows the text as it is. We use it instead of innerHTML
    // because the user typed some of this text and it must never run as HTML
    if (obj) {
        objectText.textContent = obj.name;
    } else {
        objectText.textContent = "Unknown object";
    }

    dateText.textContent = last.date;

    // join() turns the equipment array into one text separated by commas
    if (last.equipment.length > 0) {
        equipmentText.textContent = last.equipment.join(", ");
    } else {
        equipmentText.textContent = "Not specified";
    }

    ratingText.textContent = `${getStars(last.rating)} (${last.rating}/5)`;

    // Optional fields: use a default text when the user left them empty
    if (last.message === "") {
        messageText.textContent = "No comments";
    } else {
        messageText.textContent = last.message;
    }

    if (last.name === "") {
        nameText.textContent = "Anonymous";
    } else {
        nameText.textContent = last.name;
    }

    totalText.textContent = `Total observations recorded: ${observations.length}`;
}

// ---------- Start ----------
const observations = getObservations();

if (observations.length === 0) {
    showEmptyState();
} else {
    showObservation(observations);
}
