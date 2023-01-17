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
            console.log(displayValue);
            output.textContent = displayValue.join('');
            counter++;
            console.log(`Counter: ${counter}`);
        });
    });

    zero.addEventListener('click', () => {
        if (counter >= 1) {
            counter++;
            displayValue.push(zero.value);
            output.textContent = displayValue.join('');
        }
    });
}

calcDisplay();

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
        console.log(displayValue);
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
        console.log(counter);
        displayValue.pop();
        console.log(displayValue);
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

    operators.forEach((operator) => {
        operator.addEventListener('click', () => {
            counter = 0;

            if (displayValue.length === 0) {
                opCounter = 0;
                console.log(`Operator Counter :${opCounter}`);
            } else {
                opCounter++;
                console.log(`Operator Counter: ${opCounter}`);
            };

            if (opCounter >= 2) {
                y = displayValue.join('');
                formula.textContent = `${operate(x, y, z)} ${operator.textContent}`;
                output.textContent = operate(x, y, z);
                x = operate(x, y, z);
                console.log(`X: ${x}`);
                displayValue = [];
                z = operator.value;
                console.log(z);
                decimalDisplay();
            } else {
                x = output.textContent;
                console.log(`X: ${x}`);
                console.log(displayValue);
                z = operator.value;
                console.log(z);
                formula.textContent = `${x} ${operator.textContent}`;
                decimalDisplay();
                displayValue = [];
            };
        });
    });

    equals.addEventListener('click', () => {
        counter = 0;
        opCounter = 0;
        y = displayValue.join('');
        formula.textContent += ` ${y} = `;
        output.textContent = operate(x, y, z);
        displayValue = [];
    });
}

doMath();