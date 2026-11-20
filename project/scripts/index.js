const dayData = document.querySelector("#day-data");

function getDayObject() {
    const dayNumber = new Date().getDate();
    const index = dayNumber % universeObjects.length;
    return universeObjects[index];
}

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

showDayData();