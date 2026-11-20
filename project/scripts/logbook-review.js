// ---------- Elements from the page ----------
const reviewCard = document.querySelector("#review");
const emptyMessage = document.querySelector("#review-empty");
const totalText = document.querySelector("#review-total");

// ---------- Rendering ----------
function showReview() {
    const observations = getObservations();

    // Nothing saved yet: hide the summary and show the hint instead
    if (observations.length === 0) {
        reviewCard.hidden = true;
        totalText.hidden = true;
        emptyMessage.hidden = false;
        return;
    }

    // The last item of the array is the observation just recorded
    const last = observations[observations.length - 1];

    // find() returns the first object whose id matches (or undefined if none does)
    const obj = universeObjects.find(item => item.id === last.objectId);

    // textContent is used instead of innerHTML for the user's text,
    // so anything typed in the form is shown as plain text and never run as HTML
    document.querySelector("#r-object").textContent = obj ? obj.name : "Unknown object";
    document.querySelector("#r-date").textContent = last.date;

    // join() turns the array into a readable text; an empty array means nothing was checked
    document.querySelector("#r-equipment").textContent =
        last.equipment.length > 0 ? last.equipment.join(", ") : "Not specified";

    // repeat() writes a character several times: 4 filled stars + 1 empty star
    document.querySelector("#r-rating").textContent =
        `${"★".repeat(last.rating)}${"☆".repeat(5 - last.rating)} (${last.rating}/5)`;

    // Optional fields: show a fallback when the user left them empty
    document.querySelector("#r-message").textContent = last.message || "No comments";
    document.querySelector("#r-name").textContent = last.name || "Anonymous";

    totalText.textContent = `Total observations recorded: ${observations.length}`;
}

// ---------- Start ----------
showReview();