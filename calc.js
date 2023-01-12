//Mathematical functions (+, -, *, /)
function add(x, y) {
    return x + y;
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
        return output;
    } else if (z === '-') {
        output = subtract(x, y);
        return output;
    } else if (z === '*') {
        output = multiply(x, y);
        return output;
    } else if (z === '/') {
        output = divide(x, y);
        return output;
    }
}

//DOM elements for displaying information when buttons are pushed.
const display = document.querySelector('#display');
const formula = document.querySelector('.formula');
const output = document.querySelector('.output');
const clear = document.querySelector('.clear');

//DOM elements for buttons.
const numbers = document.querySelectorAll('#numbers');
const decimal = document.querySelector('.decimal');
const zero = document.querySelector('.zero');

//Function that displays the numbers when clicked as well as limit certain buttons.
let displayValue = [];
let counter = 0;

function calcDisplay() {

    numbers.forEach((number) => {
        number.addEventListener('click', () => {
            displayValue.push(number.value);
            console.log(displayValue);
            output.textContent = displayValue.join('');
            counter++;
            console.log(counter);
        });
    });

    zero.addEventListener('click', () => {
        if (counter >= 1) {
            displayValue.push(zero.value);
            output.textContent = displayValue.join('');
        }
    });
}

calcDisplay();

//Function that displays the decimal as well as limits when and how it is displayed.
function decimalDisplay() {
    decimal.addEventListener('click', () => {
        if (counter < 1) {
            displayValue.push(counter);
            displayValue.push(decimal.value);
            output.textContent = displayValue.join('');
            counter++;
        } else {
            displayValue.push(decimal.value);
            output.textContent = displayValue.join('');
        };
    }, { once: true });
}

decimalDisplay();

//Function that clears the display as well as the stored numbers in array.
function clearDisplay() {
    clear.addEventListener('click', () => {
        counter = 0;
        displayValue = [];
        console.log(displayValue);
        output.textContent = '0';
        decimalDisplay();
    });
}

clearDisplay();