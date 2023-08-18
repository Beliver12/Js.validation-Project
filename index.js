const form = document.querySelector('form');
const email = document.getElementById('mail');
const emailError = document.querySelector('#mail + span.error');
const zip = document.getElementById('ZIP');
const zipError = document.querySelector('#ZIP + span.error');
const pass1Error = document.querySelector('#psw + span.error');
const pass2Error  = document.querySelector('#psw2 + span.error');
function checkZIP() {
  const constraints = {
    ch: [
      '^(CH-)?\\d{4}$',
      'Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950',
    ],
    fr: [
      '^(F-)?\\d{5}$',
      'France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012',
    ],
    de: [
      '^(D-)?\\d{5}$',
      'Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345',
    ],
    nl: [
      '^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$',
      'Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS',
    ],
  };
  const country = document.getElementById('Country').value;
  const constraint = new RegExp(constraints[country][0], '');
  if (constraint.test(zip.value)) {
    zipError.textContent = '✔';
    zipError.style.backgroundColor = 'green';
    zip.setCustomValidity('');
  } else if (zip.value === '') {
    zip.setCustomValidity('This field must be filled');
    zipError.style.backgroundColor = '';
    zipError.textContent = '✖';
  } else {
    zip.setCustomValidity(constraints[country][1]);
    zipError.style.backgroundColor = '';
    zipError.textContent = '✖';
  }
}
function showError() {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    emailError.textContent = '✔';
    emailError.style.backgroundColor = 'green';
    email.setCustomValidity('');
  } else if (email.value === '') {
    email.setCustomValidity('This field must be filled');
    emailError.style.backgroundColor = '';
    emailError.textContent = '✖';
  } else {
    email.setCustomValidity('Entered value needs to be an email address: e.g. example@mail.com');
    emailError.style.backgroundColor = '';
    emailError.textContent = '✖';
  }
  emailError.className = 'error active';
}

function checkPassword() {
  const pass1 = document.getElementById('psw');
  const pass2 = document.getElementById('psw2');
  if (pass1.value !== pass2.value) {
   pass2.setCustomValidity('The passwords dont match');
   pass1Error.textContent = '✖';
   pass2Error.textContent = '✖';
   pass1Error.style.backgroundColor = '';
    pass2Error.style.backgroundColor = '';
  } else {
    pass1Error.textContent = '✔';
    pass2Error.textContent = '✔';
    pass1Error.style.backgroundColor = 'green';
    pass2Error.style.backgroundColor = 'green';
    pass2.setCustomValidity('');
  }
}

form.addEventListener('submit', (event) => {
  if (!email.validity.valid || !zip.validity.valid) {
    showError();
    checkZIP();
    checkPassword();
    event.preventDefault();
  }
});

window.onload = () => {
  document.getElementById('Country').onchange = checkZIP;
  document.getElementById('ZIP').oninput = checkZIP;
  document.getElementById('mail').oninput = showError;
  document.getElementById('psw').oninput = checkPassword;
  document.getElementById('psw2').oninput = checkPassword;
};
