function changeCalculator(cost, payment) {

    // Convert to cents by multipling change by 100 to avoid errors with decimals

    let change = Math.round((payment - cost) * 100);
    let leftover = change; 
    let total = payment - cost;
    let formattedTotal = parseFloat(total.toFixed(2));

    // Divides specific change ammount and uses modulo to return leftover for next coin value

    let dollars = Math.trunc(leftover / 100);
    leftover %= 100;

    let quarters = Math.trunc(leftover / 25);
    leftover %= 25;

    let dimes = Math.trunc(leftover / 10);
    leftover %= 10;

    let nickels = Math.trunc(leftover / 5);
    leftover %= 5;

    let pennies = leftover;

    return {total, dollars, quarters, dimes, nickels, pennies};
}

// Removes any previous change outputs for when error messages appear

function clearOutputs() {
    document.getElementById("total-output").innerText = "";
    document.getElementById("dollars-output").innerText = "";
    document.getElementById("quarters-output").innerText = "";
    document.getElementById("dimes-output").innerText = "";
    document.getElementById("nickels-output").innerText = "";
    document.getElementById("pennies-output").innerText = "";
}

// Connects function with button using click event handler

document.getElementById("calculate-change").addEventListener("click", () => {
    // Uses 'parseFloat' to convert input strings into floating-point numbers
    const cost = parseFloat(document.getElementById("amount-due").value);
    const payment = parseFloat(document.getElementById("amount-received").value);
    const errorDiv = document.getElementById("error");
    errorDiv.innerText = ""; // Removes any previous error messages
    errorDiv.classList.remove('error');

    // Checks if payment is real number
    if (isNaN(cost) || isNaN(payment)) {
        errorDiv.innerText = "Please enter valid numbers.";
        errorDiv.classList.add("error");
        clearOutputs(); // Clear outputs when error message populates
        return;
    }
    // Checks if payment is greater than cost
    if (payment < cost) {
    errorDiv.innerText = "Payment must be greater than or equal to cost.";
    errorDiv.classList.add("error");
    clearOutputs(); // Clear outputs when error message populates
    return;
    }

    // Calls calculation function and stores result in variable 'change'
    
    const change = changeCalculator(cost, payment);

    // Displays results of change calculation using HTML tags

    document.getElementById("total-output").innerText = "$" + change.total.toFixed(2);
    document.getElementById("dollars-output").innerText = change.dollars;
    document.getElementById("quarters-output").innerText = change.quarters;
    document.getElementById("dimes-output").innerText = change.dimes;
    document.getElementById("nickels-output").innerText = change.nickels;
    document.getElementById("pennies-output").innerText = change.pennies;
});
