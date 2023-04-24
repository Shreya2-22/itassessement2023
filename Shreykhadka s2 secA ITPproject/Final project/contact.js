const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const successMessage = document.querySelector('.success-message');
const errorMessage = document.querySelector('.error-message');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  if (validateForm()) {
    submitForm();
  }
});

function validateForm() {
  let isValid = true;
  if (nameInput.value.trim() === '') {
    setError(nameInput, 'Name is required.');
    isValid = false;
  } else {
    setSuccess(nameInput);
  }
  if (emailInput.value.trim() === '') {
    setError(emailInput, 'Email is required.');
    isValid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    setError(emailInput, 'Please enter a valid email address.');
    isValid = false;
  } else {
    setSuccess(emailInput);
  }
  if (messageInput.value.trim() === '') {
    setError(messageInput, 'Message is required.');
    isValid = false;
  } else {
    setSuccess(messageInput);
  }
  return isValid;
}

function isValidEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

function setError(input, message) {
  input.classList.add('is-invalid');
  const error = input.nextElementSibling;
  error.innerText = message;
}

function setSuccess(input) {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
}

function submitForm() {
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'process-contact-form.php', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      successMessage.classList.remove('d-none');
      form.reset();
    } else {
      errorMessage.classList.remove('d-none');
    }
  }
  xhr.send(formData);
}

