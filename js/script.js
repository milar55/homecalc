function updateInterestRateValue(value) {
    document.getElementById('interestRateValue').textContent = value + '%';
}

function updateDownpaymentValue(value) {
    document.getElementById('downpaymentValue').textContent = value + '%';
}

function updateLoanTerm() {
    const loanTerm = document.getElementById('loanTerm').value;
    // You can add any additional logic here if needed
}

function calculateAffordability() {
    // Get input values
    const annualIncome = parseFloat(document.getElementById('income').value);
    const downPaymentPercentage = parseFloat(document.getElementById('downpaymentPercentage').value) / 100;
    const downPayment = annualIncome * downPaymentPercentage; // Assuming down payment is a percentage of income
    const loanTerm = parseFloat(document.getElementById('loanTerm').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const taxRate = parseFloat(document.getElementById('taxRate').value) / 100; // Convert to decimal
    const hoaFees = parseFloat(document.getElementById('hoaFees').value);
    const pmi = parseFloat(document.getElementById('pmi').value);

    // Constants
    const MONTHLY_RATE = interestRate / 12;
    const TOTAL_PAYMENTS = loanTerm * 12;
    const MAX_DTI_RATIO = 0.28; // 28% debt-to-income ratio

    // Calculate maximum monthly payment based on income
    const maxMonthlyPayment = (annualIncome / 12) * MAX_DTI_RATIO;

    // Calculate monthly costs based on the estimated max home price
    const monthlyTax = (maxMonthlyPayment * taxRate) / 12;
    const monthlyHOA = hoaFees; // HOA fees are already monthly
    const monthlyPMI = pmi / 12;

    // Adjust maximum monthly payment to account for these costs
    const adjustedMaxMonthlyPayment = maxMonthlyPayment - (monthlyTax + monthlyHOA + monthlyPMI);

    // Recalculate maximum loan amount using the adjusted monthly payment
    const maxLoanAmount = adjustedMaxMonthlyPayment * 
                          (1 - Math.pow(1 + MONTHLY_RATE, -TOTAL_PAYMENTS)) / 
                          MONTHLY_RATE;

    // Recalculate maximum home price
    const maxHomePrice = maxLoanAmount + downPayment;

    // Calculate actual monthly payment for the maximum home price
    const loanAmount = maxHomePrice - downPayment;
    const monthlyPayment = (loanAmount * MONTHLY_RATE * Math.pow(1 + MONTHLY_RATE, TOTAL_PAYMENTS)) /
                         (Math.pow(1 + MONTHLY_RATE, TOTAL_PAYMENTS) - 1);

    // Display results
    document.getElementById('results').style.display = 'block';
    document.getElementById('maxPrice').textContent = formatCurrency(maxHomePrice);
    document.getElementById('monthlyPayment').textContent = formatCurrency(monthlyPayment);

    // Assuming these variables are defined elsewhere in your code
    console.log("Annual Income:", annualIncome);
    console.log("Max Monthly Payment:", maxMonthlyPayment);
    console.log("Adjusted Max Monthly Payment:", adjustedMaxMonthlyPayment);
    console.log("Max Loan Amount:", maxLoanAmount);
    console.log("Max Home Price:", maxHomePrice);
    console.log("Monthly Payment:", monthlyPayment);
}

function formatCurrency(number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(number);
}

function makeEditable(input) {
    input.readOnly = false; // Make the input editable
    input.focus(); // Focus on the input field
    input.addEventListener('blur', function() {
        input.readOnly = true; // Make it read-only again when it loses focus
    });
}

// Example of variable declarations (make sure these are defined in your code)
let annualIncome = 50000; // Example value
let maxMonthlyPayment = 1500; // Example value
let adjustedMaxMonthlyPayment = 1400; // Example value
let maxLoanAmount = 300000; // Example value
let maxHomePrice = 350000; // Example value
let monthlyPayment = 1200; // Example value

// Logging the values to the console
console.log("Annual Income:", annualIncome);
console.log("Max Monthly Payment:", maxMonthlyPayment);
console.log("Adjusted Max Monthly Payment:", adjustedMaxMonthlyPayment);
console.log("Max Loan Amount:", maxLoanAmount);
console.log("Max Home Price:", maxHomePrice);
console.log("Monthly Payment:", monthlyPayment);
