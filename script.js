



const calculator = {
    display: '0',
    firstValue: null,
    waitingForSecondValue: false,
    operator: null,
  };
  
  function inputDigit(digit) {
    const { display, waitingForSecondValue } = calculator;
  
    if (waitingForSecondValue === true) {
      calculator.display = digit;
      calculator.waitingForSecondValue = false;
    } else {
      calculator.display = display === '0' ? digit : display + digit;
    }
  }
  
  function inputDecimal(dot) {
   
    if (!calculator.display.includes(dot)) {
     
      calculator.display += dot;
    }
  }
  
  function handleOperator(nextOperator) {
    const { firstValue, display, operator } = calculator
    const inputValue = parseFloat(display);
  
    if (operator && calculator.waitingForSecondValue)  {
      calculator.operator = nextOperator;
      return;
    }
  
    if (firstValue == null) {
      calculator.firstValue = inputValue;
    } else if (operator) {
      const currentValue = firstValue || 0;
      const result = performCalculation[operator](currentValue, inputValue);
  
      calculator.display= String(result);
      calculator.firstValue = result;
    }
  
    calculator.waitingForSecondValue = true;
    calculator.operator = nextOperator;
  }
  
  const performCalculation = {
    '/': (firstValue, secondOperand) => firstValue / secondOperand,
  
    '*': (firstValue, secondOperand) => firstValue * secondOperand,
  
    '+': (firstValue, secondOperand) => firstValue + secondOperand,
  
    '-': (firstValue, secondOperand) => firstValue - secondOperand,
  
    '=': (firstValue, secondOperand) => secondOperand
  };
  
  function resetCalculator() {
    calculator.display = '0';
    calculator.firstValue = null;
    calculator.waitingForSecondValue = false;
    calculator.operator = null;
  }
  
  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.display;
  }
  
  updateDisplay();
  
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
      return;
    }
  
    if (target.classList.contains('operator')) {
      handleOperator(target.value);
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('all-clear')) {
      resetCalculator();
      updateDisplay();
      return;
    }
  
    inputDigit(target.value);
    updateDisplay();
  });