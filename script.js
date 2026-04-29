document.addEventListener("DOMContentLoaded", function () {

    const billInput = document.getElementById("bill");
    const tipRange = document.getElementById("tipRange");
    const tipDisplay = document.getElementById("tipDisplay");
    const tipAmount = document.getElementById("tipAmount");
    const totalTax = document.getElementById("totalTax");
    const totalTip = document.getElementById("totalTip");
    const currency = document.getElementById("currency");

    billInput.addEventListener("input", calculate);
    tipRange.addEventListener("input", calculate);
    currency.addEventListener("change", calculate);

    function calculate() {
        let bill = parseFloat(billInput.value);
        let tip = parseFloat(tipRange.value);

        // Always update slider display
        tipDisplay.textContent = tip + "%";

        // Validation
        if (isNaN(bill) || bill < 0) {
            resetFields();
            return;
        }

        if (bill === 0) {
            resetFields();
            return;
        }

        let tipAmt = (bill * tip) / 100;
        let tax = bill * 0.11;

        let totalWithTax = bill + tax;
        let totalWithTipAndTax = bill + tax + tipAmt;

        let rate = 1;
        if (currency.value === "inr") rate = 85;
        if (currency.value === "eur") rate = 0.95;

        tipAmount.value = (tipAmt * rate).toFixed(2);
        totalTax.value = (totalWithTax * rate).toFixed(2);
        totalTip.value = (totalWithTipAndTax * rate).toFixed(2);
    }

    function resetFields() {
        tipAmount.value = "";
        totalTax.value = "";
        totalTip.value = "";
    }

});