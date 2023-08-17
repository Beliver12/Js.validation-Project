const form = document.querySelector('form');
const email = document.getElementById('mail');
const emailError = document.querySelector('#mail + span.error');

email.addEventListener('input', (event) => {
    if(email.validity.valid) {
        emailError.textContent = '';
        emailError.className = 'error';
        emailError.textContent = 'Good job!';
        emailError.style.backgroundColor = 'green';
    } else {
        showError();
    }
});

form.addEventListener('submit', (event) => {
    if(!email.validity.valid) {
        showError();
        event.preventDefault();
    }
});

function showError() {
    if(email.validity.valueMissing) {
        emailError.textContent = 'You need to enter an email address.';
        emailError.style.backgroundColor = '';
    } else if (email.validity.typeMismatch) {
        emailError.textContent = 'Entered value needs to be an email address.';
        emailError.style.backgroundColor = '';
    }
    emailError.className = 'error active';
}