const contact_form = document.getElementById('contact-form');
const clearAll = document.querySelector('.clearBtn');
const mortageAmount = document.getElementById('mortage');
const mortageAmount_row = document.querySelector('.mortage-amount');
const mortageTerm_row = document.querySelector('.mortage-Term');
const interestRate_row = document.querySelector('.Interest-amount');
const mortageTerm = document.getElementById('mortageTerm');
const interestRate = document.getElementById('InterestAmount');

let radioBtn_parent = document.querySelector('.radio');
var validateAmount = false;
var validateTerm = false;
var validateRate = false;
var validateRadio = false;
let mortageParent = (mortageAmount.parentElement).parentElement;
let mortageTerm_Parent = (mortageTerm.parentElement).parentElement;
let interestRate_Parent = (interestRate.parentElement).parentElement;
var errorMsg = `<span class="errorMsg">This field is required</span>`;


contact_form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (validateAmount && validateTerm && validateRate && validateRadio) {
    let selectedRadio = document.querySelector('input[name="mortage-Type"]:checked');

    const principal = parseFloat(mortageAmount.value.replace(/[^0-9.]/g, ''));
    const term = parseInt(mortageTerm.value);
    const interest = parseFloat(interestRate.value.replace(/[^0-9.]/g, '')) / 100;
    const monthlyInterestRate = interest / 12;
    const numberOfPayments = term * 12;
    if (selectedRadio.id == "Interest") {
      if (!isNaN(principal) && !isNaN(term) && !isNaN(interest)){
       
        const interesMortage = principal * monthlyInterestRate;
        const totalInterst_mortage = (interesMortage * numberOfPayments) + principal;
           // Update the result display
      document.querySelector('.monthly-repayments').innerText = `£${interesMortage.toFixed(2)}`;
      document.querySelector('.Total-repay').innerText = `£${totalInterst_mortage.toFixed(2)}`;
         // Show the results
         document.querySelector('.resultScreen1').style.display = 'none';
      document.querySelector('.resultScreen2').classList.add("screenDisplay");
      }
    }
    if (selectedRadio.id == "Repayment") {
 // Check if inputs are valid
 if (!isNaN(principal) && !isNaN(term) && !isNaN(interest)) {
      // Calculate monthly interest rate
   

      // Calculate monthly repayment
      const monthlyRepayment = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      const totalRepayment = monthlyRepayment * numberOfPayments;

      // Update the result display
      document.querySelector('.monthly-repayments').innerText = `£${monthlyRepayment.toFixed(2)}`;
      document.querySelector('.Total-repay').innerText = `£${totalRepayment.toFixed(2)}`;

      // Show the results
      document.querySelector('.resultScreen1').style.display = 'none';
      document.querySelector('.resultScreen2').classList.add("screenDisplay");
    } else {
      alert('Please enter valid numbers for all fields.');
    }
    }

  }
});

clearAll.addEventListener('click', function () {
  contact_form.reset();
  setTimeout(() => location.reload(), 0);
});
// Mortage amount field
mortageAmount.addEventListener('input', function () {
  if (mortageAmount.value) {
    validateAmount = true;
    let errorMsgs = mortageParent.querySelector('.errorMsg');
    if (errorMsgs) {
      errorMsgs.remove();
    }

    mortageAmount_row.classList.remove('errorBorder');
    document.querySelector('.mortage-amount span').classList.remove("errorSpan");
    // Remove any non-numeric characters before converting to a number
    let amount = parseFloat(mortageAmount.value.replace(/[^0-9.]/g, ''));

    // Check if the input is a valid number
    if (!isNaN(amount)) {
      // Format the amount as GBP currency
      mortageAmount.value = amount.toLocaleString({ style: 'currency', currency: 'GBP' });
    }
  }
});

// mortage term  field

mortageTerm.addEventListener('input', function () {
  if (mortageTerm.value) {
    validateTerm = true;
    let errorMsgs = mortageTerm_Parent.querySelector('.errorMsg');
    if (errorMsgs) {
      errorMsgs.remove();
    }
    mortageTerm_row.classList.remove('errorBorder');
    document.querySelector('.mortage-Term span').classList.remove("errorSpan");
    // Remove any non-numeric characters before converting to a number
    let amount = parseFloat(mortageTerm.value.replace(/[^0-9.]/g, ''));

    // Check if the input is a valid number
    if (!isNaN(amount)) {
      // Format the amount as GBP currency
      mortageTerm.value = amount.toLocaleString({ style: 'currency', currency: 'GBP' });
    }
  }
});

//  interest rate field

interestRate.addEventListener('input', function () {
  if (interestRate.value) {
    validateRate = true;
    let errorMsgs = interestRate_Parent.querySelector('.errorMsg');
    if (errorMsgs) {
      errorMsgs.remove();
    }
    interestRate_row.classList.remove('errorBorder');
    document.querySelector('.Interest-amount span').classList.remove("errorSpan");
    // Remove any non-numeric characters before converting to a number
    let amount = parseFloat(interestRate.value.replace(/[^0-9.]/g, ''));

    // Check if the input is a valid number
    if (!isNaN(amount)) {
      // Format the amount as GBP currency
      interestRate.value = amount.toLocaleString({ style: 'currency', currency: 'GBP' });
    }
  }
});

// Add event listener for radio buttons to remove error message on selection
document.querySelectorAll('input[name="mortage-Type"]').forEach((radio) => {
  radio.addEventListener('change', function () {
    let selectedRadio = document.querySelector('input[name="mortage-Type"]:checked');
    let errorMsgs = radioBtn_parent.querySelector('.errorMsg');

    if (selectedRadio) {
      if (errorMsgs) {
        errorMsgs.remove();
      }
    }
    validateRadio = true;
  });
});
function validate() {
  let selectedRadio = document.querySelector('input[name="mortage-Type"]:checked');
  if (!selectedRadio) {
    if (!radioBtn_parent.querySelector('.errorMsg')) {
      radioBtn_parent.insertAdjacentHTML('beforeend', errorMsg); // Append the error message if it doesn't exist
    } // Show error if no radio button is selected
    validateRadio = false;
  }
  else {
    let errorMsgs = radioBtn_parent.querySelector('.errorMsg');

    if (errorMsgs) {
      errorMsgs.remove();
    } // Hide error if a radio button is selected
    validateRadio = true;
  }

  if (!validateAmount) {

    mortageAmount_row.classList.add('errorBorder');
    document.querySelector('.mortage-amount span').classList.add("errorSpan");
    if (!mortageParent.querySelector('.errorMsg')) {
      mortageParent.insertAdjacentHTML('beforeend', errorMsg); // Append the error message if it doesn't exist
    }

  }
  if (!validateTerm) {

    mortageTerm_row.classList.add('errorBorder');
    document.querySelector('.mortage-Term span').classList.add("errorSpan");
    if (!mortageTerm_Parent.querySelector('.errorMsg')) {
      mortageTerm_Parent.insertAdjacentHTML('beforeend', errorMsg);
    }


  }
  if (!validateRate) {

    interestRate_row.classList.add('errorBorder');
    document.querySelector('.Interest-amount span').classList.add("errorSpan");
    if (!interestRate_Parent.querySelector('.errorMsg')) {
      interestRate_Parent.insertAdjacentHTML('beforeend', errorMsg);
    }


  }

}
