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

//EventListener that displays the numbers when clicked.
const numbers = document.querySelectorAll('#numbers');

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        display.textContent = number.classList;
    });
});