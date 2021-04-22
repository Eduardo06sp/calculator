function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function calculate(a, b, operator) {
  switch (operator) {
    case '÷':
      if (b === 0) {
	return 'Can\'t divide by 0!';
      }

      return round(divide(a, b));
      break;
    case '×':
      return round(multiply(a, b));
      break;
    case '−':
      return round(subtract(a, b));
      break;
    case '+':
      return round(add(a, b));
      break;
  }
}

function round(num) {
  if (Math.floor(num) === num) {
    return num;
  }

  return num.toFixed(2);
}

let operandA = null;
let operandB = null;
let operator = '';
let result = '';

const calculatorNumbers = document.querySelector('.numbers');
calculatorNumbers.addEventListener('mousedown', updateNumberDisplayed);

function updateNumberDisplayed(e) {
  let number = e.key || e.target.textContent;

  if (validateNumber(number)) {
    result += number;
    updateDisplay(result);
  } else if (number === 'Del' || number === 'Backspace') {
    result = result.slice(0, -1);
    updateDisplay(result);
  }
}

function validateNumber(number) {
  let integer = parseFloat(number);

  if (integer === 1 ||
      integer === 2 ||
      integer === 3 ||
      integer === 4 ||
      integer === 5 ||
      integer === 6 ||
      integer === 7 ||
      integer === 8 ||
      integer === 9 ||
      integer === 0) {
    return true;
  } else {
    return false;
  }
}

const calcDisplay = document.querySelector('.display-content');

function updateDisplay(content) {
  calcDisplay.textContent = content;
}

const operatorButtons = document.querySelector('.operators');
operatorButtons.addEventListener('mousedown', checkOperands);

function checkOperands(e) {

  if (e.target.textContent === 'C') {
    operandA = null;
    operandB = null;
    operator = '';
    result = '';
    updateDisplay(result);
    return;
  }


  if (!(operandA) && !(calcDisplay.textContent === '')) {
    operandA = calcDisplay.textContent;
    updateDisplay('');
  } else if (!(operandB) && !(calcDisplay.textContent === '')) {
    operandB = calcDisplay.textContent;
  }

  if (operandA && operandB && (e.target.textContent === '=')) {
    result = calculate(parseFloat(operandA), parseFloat(operandB), operator);
    updateDisplay(result);
    operandA = null;
    operandB = null;
  } else if (e.target.textContent === '=') {
    operandA = null;
    operandB = null;
  } else if (operandA && operandB) {
    result = calculate(parseFloat(operandA), parseFloat(operandB), operator);
    updateDisplay(result);
    operandA = result;
    operandB = null;
  }

  operator = e.target.textContent;
  result = '';
}
