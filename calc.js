//Mathematical functions (+, -, *, /)
function add(x, y) {
    return parseInt(x) + parseInt(y);
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

//Function that takes in operator and 2 numbers then applies one of the math functions to the numbers.
function operate(x, y, z) {
    let output = 0;

    if (z === '+') {
        output = add(x, y);
        return Math.round(1000 * output) / 1000;
    } else if (z === '-') {
        output = subtract(x, y);
        return Math.round(1000 * output) / 1000;
    } else if (z === '*') {
        output = multiply(x, y);
        return Math.round(1000 * output) / 1000;
    } else if (z === '/') {
        output = divide(x, y);
        return Math.round(1000 * output) / 1000;
    }
}

//DOM elements for displaying information when buttons are pushed.
const display = document.querySelector('#display');
const formula = document.querySelector('.formula');
const output = document.querySelector('.output');

//DOM elements for buttons.
const numbers = document.querySelectorAll('#numbers');
const operators = document.querySelectorAll('#operators');
const decimal = document.querySelector('.decimal');
const zero = document.querySelector('.zero');
const clear = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
const equals = document.querySelector('.equals');

//Global variables for the following functions.
let displayValue = [];
let counter = 0;
let opCounter = 0;

//Function that displays the numbers when clicked as well as limit certain buttons.
function calcDisplay() {

    numbers.forEach((number) => {
        number.addEventListener('click', () => {
            displayValue.push(number.value);
            output.textContent = displayValue.join('');
            counter++;
        });
    });

    zero.addEventListener('click', () => {
        if (counter >= 1) {
            counter++;
            displayValue.push(zero.value);
            output.textContent = displayValue.join('');
        };
    });
}

calcDisplay();

//Function that displays the 0 button and also limits its uses.
function zeroDisplay() {
    zero.addEventListener('click', () => {
        const zeroCheck = displayValue.includes('0');
        if (opCounter >= 1 && counter < 1 && zeroCheck === false) {
            displayValue.push(zero.value);
            output.textContent = displayValue.join('');
        };
    }, { once: true });
}

//Function that displays the decimal as well as limits when and how it is displayed.
function decimalDisplay() {
    decimal.addEventListener('click', () => {
        const decimalCheck = displayValue.includes('.');

        if (counter < 1) {
            displayValue.push(zero.value);
            counter++;
            displayValue.push(decimal.value);
            counter++;
            output.textContent = displayValue.join('');
        } else if (decimalCheck === false) {
            displayValue.push(decimal.value);
            counter++;
            output.textContent = displayValue.join('');
        };
    }, { once: true });
}

decimalDisplay();

//Function that clears the display as well as the stored numbers in array.
function clearDisplay() {
    clear.addEventListener('click', () => {
        counter = 0;
        opCounter = 0;
        displayValue = [];
        output.textContent = '0';
        formula.textContent = '';
        decimalDisplay();
    });
}

clearDisplay();

//Function that deletes numbers from right to left on the display as well as displayValue
function deleteDisplay() {
    deleteBtn.addEventListener('click', () => {
        if (counter > 0) {
            counter--;
        };
        displayValue.pop();
        output.textContent = displayValue.join('');
        decimalDisplay();
    });
}

deleteDisplay();

//Function that stores first number and operator when user presses any operator
function doMath() {

    let x = '';
    let y = '';
    let z = '';
    let eqCounter = 0;

    operators.forEach((operator) => {
        operator.addEventListener('click', () => {
            eqCounter++;
            counter = 0;

            if (displayValue.length === 0) {
                opCounter = 0;
            } else {
                opCounter++;
            };

            zeroDisplay();

            if (opCounter >= 2) {
                y = displayValue.join('');
                formula.textContent = `${operate(x, y, z)} ${operator.textContent}`;
                output.textContent = operate(x, y, z);
                x = operate(x, y, z);
                displayValue = [];
                z = operator.value;
                decimalDisplay();
            } else {
                x = output.textContent;
                z = operator.value;
                formula.textContent = `${x} ${operator.textContent}`;
                decimalDisplay();
                displayValue = [];
            };

            if (opCounter >= 2 && x === Infinity) {
                output.textContent = 'ERROR';
                formula.textContent = 'ERROR';
                opCounter = 0;
            };
        });
    });

    equals.addEventListener('click', () => {

        const equalsCheck = formula.textContent.includes('=');

        if (equalsCheck === false) {
            counter = 0;
            opCounter = 0;
            y = displayValue.join('');
            formula.textContent += ` ${y} = `;
            output.textContent = operate(x, y, z);
            displayValue = [];

            if (operate(x, y, z) === Infinity) {
                output.textContent = 'ERROR';
            };
        };
    });
}

doMath();