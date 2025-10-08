let bill = document.getElementById("billInput");
let billValue;
let people = document.getElementById("peopleInput");
let peopleValue;
let tipAmountDisplay = document.getElementById("displayTipAmount");
let totalAmountDisplay = document.getElementById("displayTotalAmount");
let resetButton = document.getElementById("resetButton");
let tipPercent = 0;
let tipAmount;
let total;

// validate bill and number of people inputs
function validate(value, element, ref) {
    if (isNaN(Number(value))){
        showError("Numbers Only!", element, ref);
    }
    else if (value == 0){
        showError("Can't be zero", element, ref);
    }
    else {
        clearError(element, ref);
        if (ref === "billInput") {
            billValue = Number(value);
            console.log("billValue: " + billValue)
        }
        else if (ref === "peopleInput") {
            peopleValue = Number(value);
        }
    }
    console.log("bill: " + billValue)
    calculateTip(billValue, tipPercent, peopleValue);
}

// tip buttons
let buttonActive = document.getElementById("none");
function setTipPercent(className, amount) {
    temp = document.getElementsByClassName(className);
    buttonActive.id = "inactive";
    buttonActive = temp[0];
    buttonActive.id = "active";
    tipPercent = amount;
    calculateTip(billValue, tipPercent, peopleValue);
}

// custom tip input
function setTipPercentCustom(className, amount) {
    buttonActive.id = "inactive";
    tipPercent = amount;
    calculateTip(billValue, tipPercent, peopleValue);
}

function calculateTip(billValue, tipPercent, peopleValue) {
    tipAmount = validateCalculation(((billValue*((100+Number(tipPercent))/100)-billValue)/peopleValue).toFixed(2));
    total = validateCalculation(((billValue/peopleValue)+Number(tipAmount)).toFixed(2));
    displayTip(tipAmount, tipAmountDisplay);
    displayTip(total, totalAmountDisplay)
}

function validateCalculation(amount) {
    if (amount == Infinity | isNaN(amount)){
        return "--";
    }
    return amount;
}

function displayTip(amount, display) {
    display.innerHTML = '$' + amount;
    console.log("answer: " + amount)
}

function showError(message, element, ref) {
    document.getElementById(element).innerHTML = message;
    document.getElementById(ref).style.outlineColor = 'var(--error)';
}

function clearError(element, ref) {
    document.getElementById(element).innerHTML = '';
    document.getElementById(ref).style.outlineColor = 'var(--Green400)';
}

// change reset button appearance if there are changes
window.setInterval(function() {
    console.log(bill.value);
    if (bill.value != "" || people.value != "" || tipPercent != 0) {
    resetButton.style.backgroundColor = "var(--Green400)";
}
    else {
       resetButton.style.backgroundColor = "var(--Green800)"; 
    }
}, 200)

function reset() {
    location.reload();
}