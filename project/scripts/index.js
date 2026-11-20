// Container where the "Day Data" card will be rendered
const dayData = document.querySelector("#day-data");

// Pick one object per day: the day of the month (1-31) modulo the array length
// always gives a valid index between 0 and length - 1
function getDayObject() {
    const dayNumber = new Date().getDate();
    const index = dayNumber % universeObjects.length;
    return universeObjects[index];
}

// Build the card HTML with a template literal and insert it in the page
function showDayData() {
    const obj = getDayObject();

    dayData.innerHTML = `
        <img src="${obj.image}" alt="${obj.alt}" width="300" height="200">
        <div>
            <h3>${obj.name}</h3>
            <p class="type">${obj.type}</p>
            <p>${obj.fact}</p>
        </div>`;
}

// Run once when the page loads
showDayData();