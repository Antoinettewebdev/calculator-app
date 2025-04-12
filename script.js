let display = document.getElementById('display');
let currentInput = '';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let expression = '';

function appendNumber(number) {
    if (waitingForSecondOperand) {
        currentInput = number;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    display.textContent = expression + currentInput;
}

function appendOperator(op) {
    const inputNumber = currentInput;
    
    if (operator && waitingForSecondOperand) {
        operator = op;
        expression = expression.slice(0, -1) + op;
        display.textContent = expression;
        return;
    }

    if (firstOperand === null) {
        firstOperand = parseFloat(inputNumber);
    } else if (operator) {
        const result = calculate();
        firstOperand = result;
        display.textContent = result;
    }

    waitingForSecondOperand = true;
    operator = op;
    expression = inputNumber + op;
    display.textContent = expression;
    currentInput = '';
}

function calculate() {
    if (!operator || firstOperand === null) {
        return parseFloat(currentInput || '0');
    }

    const secondOperand = parseFloat(currentInput || '0');
    let result = 0;

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            if (secondOperand === 0) {
                alert('Cannot divide by zero');
                clearDisplay();
                return 0;
            }
            result = firstOperand / secondOperand;
            break;
    }

    // Format the result to handle long decimals
    result = Number(parseFloat(result.toFixed(8)));
    
    // Update display with the result
    display.textContent = result;
    
    // Reset calculator state
    expression = '';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    currentInput = result.toString();
    
    return result;
}

function clearDisplay() {
    display.textContent = '0';
    currentInput = '';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    expression = '';
}

window.onload = function() {
    display.textContent = '0';
};