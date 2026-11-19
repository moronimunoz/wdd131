// 1. Static values (must match what the HTML displays)
const temperature = 10; // °C
const windSpeed = 5;    // km/h

// 2. Function with ONE line of calculation (metric formula)
function calculateWindChill(temp, speed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
}

// 3. Only call it if the conditions are met
let windChill = "N/A";

if (temperature <= 10 && windSpeed > 4.8) {
    windChill = calculateWindChill(temperature, windSpeed).toFixed(1) + " °C";
}

// 4. Display it on the page
document.querySelector("#windchill").textContent = windChill;
