document.addEventListener("DOMContentLoaded", function () {

    const button = document.getElementById("getDataBtn");
    const select = document.getElementById("locationSelect");
    const errorBox = document.getElementById("error-message");
    const errorText = document.getElementById("error-text");

    button.addEventListener("click", async function () {

        const value = select.value;

        if (!value) {
            alert("Select a location to begin.");
            return;
        }

        errorBox.hidden = true;
        errorText.textContent = "";

        const [lat, lng] = value.split(",");

        const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (!data || data.status !== "OK") {
                throw new Error("Invalid API response");
            }

            const t = data.results;

            document.getElementById("today-sunrise").textContent = t.sunrise || "--";
            document.getElementById("today-sunset").textContent = t.sunset || "--";
            document.getElementById("today-dawn").textContent = t.dawn || "--";
            document.getElementById("today-dusk").textContent = t.dusk || "--";
            document.getElementById("today-noon").textContent = t.solar_noon || "--";
            document.getElementById("today-length").textContent = t.day_length || "--";
            document.getElementById("today-timezone").textContent = t.timezone || "--";

            document.getElementById("tomorrow-sunrise").textContent = t.sunrise || "--";
            document.getElementById("tomorrow-sunset").textContent = t.sunset || "--";
            document.getElementById("tomorrow-dawn").textContent = t.dawn || "--";
            document.getElementById("tomorrow-dusk").textContent = t.dusk || "--";
            document.getElementById("tomorrow-noon").textContent = t.solar_noon || "--";
            document.getElementById("tomorrow-length").textContent = t.day_length || "--";
            document.getElementById("tomorrow-timezone").textContent = t.timezone || "--";

        } catch (error) {

            console.error(error);

            errorText.textContent =
                "Data not available. Please select a different location and try again.";

            errorBox.hidden = false;
        }
    });
});