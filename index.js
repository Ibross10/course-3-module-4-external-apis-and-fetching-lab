const weatherApi = "https://api.weather.gov/alerts/active?area=";

const stateInput = document.querySelector("#state-input");
const fetchButton = document.querySelector("#fetch-alerts");
const alertsDisplay = document.querySelector("#alerts-display");
const errorMessage = document.querySelector("#error-message");

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

function clearError() {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
}

function displayAlerts(data) {
    alertsDisplay.innerHTML = "";

    const alerts = data.features || [];

    const heading = document.createElement("h2");
    heading.textContent = `Weather Alerts: ${alerts.length}`;
    alertsDisplay.appendChild(heading);

    alerts.forEach((alert) => {
        const alertText = document.createElement("p");
        alertText.textContent = alert.properties.headline;
        alertsDisplay.appendChild(alertText);
    });
}

function fetchWeatherData(state) {
    return fetch(`${weatherApi}${state}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Unable to fetch weather alerts.");
            }

            return response.json();
        })
        .then((data) => {
            clearError();
            displayAlerts(data);
        })
        .catch((error) => {
            showError(error.message);
        });
}

fetchButton.addEventListener("click", () => {
    const state = stateInput.value.trim().toUpperCase();

    if (state === "") {
        showError("Please enter a state abbreviation.");
        return;
    }

    fetchWeatherData(state);
    stateInput.value = "";
});