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

      return divide(a, b);
      break;
    case '×':
      return multiply(a, b);
      break;
    case '−':
      return subtract(a, b);
      break;
    case '+':
      return add(a, b);
      break;
  }
}
