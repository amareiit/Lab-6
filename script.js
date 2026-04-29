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


        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split("T")[0];

        const todayUrl = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}`;
        const tomorrowUrl = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=${tomorrowStr}`;

        try {

            const [todayRes, tomorrowRes] = await Promise.all([
                fetch(todayUrl),
                fetch(tomorrowUrl)
            ]);

            const todayData = await todayRes.json();
            const tomorrowData = await tomorrowRes.json();

            if (todayData.status !== "OK" || tomorrowData.status !== "OK") {
                throw new Error("Invalid API response");
            }

            const t = todayData.results;
            const tm = tomorrowData.results;

            document.getElementById("today-sunrise").textContent = t.sunrise || "--";
            document.getElementById("today-sunset").textContent = t.sunset || "--";
            document.getElementById("today-dawn").textContent = t.dawn || "--";
            document.getElementById("today-dusk").textContent = t.dusk || "--";
            document.getElementById("today-noon").textContent = t.solar_noon || "--";
            document.getElementById("today-length").textContent = t.day_length || "--";
            document.getElementById("today-timezone").textContent = t.timezone || "--";

            document.getElementById("tomorrow-sunrise").textContent = tm.sunrise || "--";
            document.getElementById("tomorrow-sunset").textContent = tm.sunset || "--";
            document.getElementById("tomorrow-dawn").textContent = tm.dawn || "--";
            document.getElementById("tomorrow-dusk").textContent = tm.dusk || "--";
            document.getElementById("tomorrow-noon").textContent = tm.solar_noon || "--";
            document.getElementById("tomorrow-length").textContent = tm.day_length || "--";
            document.getElementById("tomorrow-timezone").textContent = tm.timezone || "--";

        } catch (error) {
            console.error(error);
            errorText.textContent = "Data not available. Please select a different location and try again.";
            errorBox.hidden = false;
        }
    });
});