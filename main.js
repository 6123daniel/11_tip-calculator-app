console.log("Hello world!");
let bill = document.getElementById("billInput");
let people = document.getElementById("peopleInput");
let tipAmountDisplay = document.getElementById("displayTipAmount");
let totalAmountDisplay = document.getElementById("displayTotalAmount");
let tipPercent = 0;
let tipAmount;
let total;

// bill.addEventListener("change", calculateTip());

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
            bill = Number(value);
        }
        else if (ref === "peopleInput") {
            people = Number(value);
        }

    }
    console.log("bill: " + bill)
    calculateTip(bill, tipPercent, people);
}

// tip buttons
let buttonActive = document.getElementById("none");
function setTipPercent(className, amount) {
    temp = document.getElementsByClassName(className);
    buttonActive.id = "inactive";
    buttonActive = temp[0];
    buttonActive.id = "active";
    tipPercent = amount;
    calculateTip(bill, tipPercent, people);
}

// custom tip input
function setTipPercentCustom(className, amount) {
    buttonActive.id = "inactive";
    tipPercent = amount;
    calculateTip(bill, tipPercent, people);
}

function calculateTip(bill, tipPercent, people) {
    tipAmount = validateCalculation(((bill*((100+Number(tipPercent))/100)-bill)/people).toFixed(2));
    total = validateCalculation(((bill/people)+Number(tipAmount)).toFixed(2));
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
