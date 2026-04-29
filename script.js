document.addEventListener("DOMContentLoaded", function () {

    const button = document.getElementById("getDataBtn");
    const select = document.getElementById("locationSelect");

    button.addEventListener("click", async function () {

        const value = select.value;

        if (!value) {
            alert("Select a location to begin.");
            return;
        }

        const [lat, lng] = value.split(",");

        const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (!data || data.status !== "OK") {
                throw new Error("Invalid API response");
            }

            const results = data.results;

            document.getElementById("today-sunrise").textContent = results.sunrise || "--";
            document.getElementById("today-sunset").textContent = results.sunset || "--";
            document.getElementById("today-dawn").textContent = results.dawn || "--";
            document.getElementById("today-dusk").textContent = results.dusk || "--";
            document.getElementById("today-noon").textContent = results.solar_noon || "--";
            document.getElementById("today-length").textContent = results.day_length || "--";
            document.getElementById("today-timezone").textContent = results.timezone || "--";

            const tomorrow = results.next_day || {};

            document.getElementById("tomorrow-sunrise").textContent = tomorrow.sunrise || "--";
            document.getElementById("tomorrow-sunset").textContent = tomorrow.sunset || "--";
            document.getElementById("tomorrow-dawn").textContent = tomorrow.dawn || "--";
            document.getElementById("tomorrow-dusk").textContent = tomorrow.dusk || "--";
            document.getElementById("tomorrow-noon").textContent = tomorrow.solar_noon || "--";
            document.getElementById("tomorrow-length").textContent = tomorrow.day_length || "--";
            document.getElementById("tomorrow-timezone").textContent = results.timezone || "--";

        } catch (error) {
            console.error(error);


            document.getElementById("dashboard").innerHTML = `
                <div class="card">
                    <h2>Error</h2>
                    <p>Data not available. Select a different location.</p>
                </div>
            `;
        }

    });

});