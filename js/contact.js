// Contact form validation
// Demonstrates: event handling, DOM manipulation, form validation

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');

  var fields = {
    name: { input: document.getElementById('name'), error: document.getElementById('name-error') },
    email: { input: document.getElementById('email'), error: document.getElementById('email-error') },
    phone: { input: document.getElementById('phone'), error: document.getElementById('phone-error') },
    message: { input: document.getElementById('message'), error: document.getElementById('message-error') }
  };

  function setInvalid(fieldKey, message) {
    var field = fields[fieldKey];
    field.input.closest('.field').classList.add('invalid');
    field.error.textContent = message;
  }

  function setValid(fieldKey) {
    var field = fields[fieldKey];
    field.input.closest('.field').classList.remove('invalid');
    field.error.textContent = '';
  }

  function isValidEmail(value) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
  }

  function isValidPhone(value) {
    var digitsOnly = /^[0-9]+$/;
    return digitsOnly.test(value);
  }

  function validate() {
    var valid = true;

    var name = fields.name.input.value.trim();
    if (name === '') { setInvalid('name', 'Please enter your name.'); valid = false; }
    else setValid('name');

    var email = fields.email.input.value.trim();
    if (email === '') { setInvalid('email', 'Please enter your email address.'); valid = false; }
    else if (!isValidEmail(email)) { setInvalid('email', 'Please enter a valid email address.'); valid = false; }
    else setValid('email');

    var phone = fields.phone.input.value.trim();
    if (phone === '') { setInvalid('phone', 'Please enter your phone number.'); valid = false; }
    else if (!isValidPhone(phone)) { setInvalid('phone', 'Phone number should contain digits only.'); valid = false; }
    else setValid('phone');

    var message = fields.message.input.value.trim();
    if (message === '') { setInvalid('message', 'Please write a short message.'); valid = false; }
    else setValid('message');

    return valid;
  }

  Object.keys(fields).forEach(function (key) {
    fields[key].input.addEventListener('blur', validate);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = validate();

    if (ok) {
      status.textContent = 'Thanks for reaching out — Irene will get back to you soon.';
      status.className = 'form-status show ok';
      form.reset();
    } else {
      status.className = 'form-status';
      status.textContent = '';
    }
  });
});
