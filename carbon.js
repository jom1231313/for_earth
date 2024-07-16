document.getElementById('carbon-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const electricity = parseFloat(document.getElementById('electricity').value);
    const gas = parseFloat(document.getElementById('gas').value);
    const fuel = parseFloat(document.getElementById('fuel').value);
    const miles = parseFloat(document.getElementById('miles').value);

    // Constants for CO2 emissions (in kg CO2 per unit)
    const CO2_PER_KWH = 0.233; // kg CO2 per kWh of electricity
    const CO2_PER_M3_GAS = 2.05; // kg CO2 per cubic meter of natural gas
    const CO2_PER_LITRE_FUEL = 2.31; // kg CO2 per litre of fuel
    const CO2_PER_MILE = 0.404; // kg CO2 per mile driven

    // Calculate total emissions
    const totalCO2 = (electricity * CO2_PER_KWH) + (gas * CO2_PER_M3_GAS) + (fuel * CO2_PER_LITRE_FUEL) + (miles * CO2_PER_MILE);

    // Animate the result display
    animateValue("carbon-output", 0, totalCO2, 2000);
});

function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.textContent = `${(progress * end).toFixed(2)} kg CO2`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
