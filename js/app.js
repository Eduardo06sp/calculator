const calcDisplay = document.querySelector('.display-content');
const calculatorNumbers = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
let operandA = null;
let operandB = null;
let operator = '';
let result = '';

for (let el of operatorButtons) {
  el.addEventListener('mousedown', checkOperands);
}

for (let el of calculatorNumbers) {
  el.addEventListener('mousedown', updateNumberDisplayed);
}

document.addEventListener('keydown', logKey);

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

function updateNumberDisplayed(e) {
  let number = e.key || e.target.textContent;
  if (validateNumber(number)) {
    result += number;
    updateDisplay(result);
  } else if (number === 'Del' || number === 'Backspace') {
    result = result.slice(0, -1);
    updateDisplay(result);
  } else if (number === '.') {
    if (calcDisplay.textContent.indexOf('.') === -1) {
      result += number;
      updateDisplay(result);
    } else {
      return;
    }
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

function updateDisplay(content) {
  calcDisplay.textContent = content;
}

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

  if (operandA && operandB && (e.target.textContent === '=' || e.key === '=' || e.key === 'Enter')) {
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

  if (e.key) {
    let key = e.key;
    switch (key) {
      case '/':
	operator = '÷';
	break;
      case '*':
	operator = '×';
	break;
      case '-':
	operator = '−';
	break;
      case 'Enter':
	operator = '=';
	break;
      case 'C':
      case '+':
      case '=':
	operator = key;
	break;
    }
  } else {
    operator = e.target.textContent;
  }
  result = '';
}

function logKey(e) {
  let keyPressed = e.key;
  switch (keyPressed) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '.':
    case '0':
    case 'Backspace':
      updateNumberDisplayed(e);
      break;
    case 'C':
    case '/':
    case '*':
    case '-':
    case '+':
    case '=':
    case 'Enter':
      checkOperands(e);
      break;
  }
}
