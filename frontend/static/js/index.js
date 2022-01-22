// Elements
const form = document.getElementById('contact-info');
const user = document.getElementById('name');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const button = document.getElementById('form__btn');

// Event Listeners
user.addEventListener('input', e => nameInput(e));
user.addEventListener('blur', e => nameBlur(e));
phone.addEventListener('input', e => phoneInput(e));
phone.addEventListener('blur', e => phoneBlur(e));
email.addEventListener('input', e => emailInput(e));
email.addEventListener('blur', e => emailBlur(e));

// Tracks validations
const formValidationConfig = {
  name: false,
  phone: false,
  email: false,
};

/**
 * Posts form.
 */
form.addEventListener('submit', async e => {
  e.preventDefault();

  if (Object.values(formValidationConfig).every(el => el)) {
    try {
      //Added a "SUBMITTING" state to the button.
      // Disabling submit button so that the user isn't able to make multiple posts.
      button.innerHTML = 'SUBMITTING';
      button.setAttribute('disabled', true);

      const formData = new FormData(form);
      const config = {
        method: 'post',
        body: formData,
      };

      const response = await fetch(
        'https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar',
        config
      ).then(res => res.json());
      console.log(response);

      form.reset();
      button.innerHTML = 'SUBMITTED';
      button.setAttribute('disabled', true);
    } catch (err) {
      button.innerHTML = 'ENTER TO WIN';
      button.removeAttribute('disabled');
      console.log(err);
    }
  } else {
    console.log('Info needed');
  }
});

/**
 * Validates that the focused name input.
 */
function nameInput(e) {
  if (e.target.value.length > 2) {
    formValidationConfig.name = true;
    user.classList.remove('error');
  }
}

/**
 * Validates name and handles validation styles.
 */
function nameBlur(e) {
  if (e.target.value.length > 2) {
    formValidationConfig.name = true;
    user.classList.remove('error');
  } else {
    formValidationConfig.name = false;
    user.classList.add('error');
  }
}

/**
 * Mask phone number with: (XXX) XXX-XXXX
 * Validates that the focused phone input.
 */
function phoneInput(e) {
  const isPhoneNum = e.target.value.search(/\(\d{3}\)\s\d{3}-\d{4}/);
  const x = e.target.value
    .replace(/\D/g, '')
    .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  e.target.value = !x[2]
    ? x[1]
    : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

  if (isPhoneNum !== -1) {
    formValidationConfig.phone = true;
    phone.classList.remove('error');
  }
}

/**
 * Validates phone number and handles validation styles.
 */
function phoneBlur(e) {
  const isPhoneNum = e.target.value.search(/\(\d{3}\)\s\d{3}-\d{4}/);

  if (isPhoneNum !== -1) {
    formValidationConfig.phone = true;
    phone.classList.remove('error');
  } else {
    formValidationConfig.phone = false;
    phone.classList.add('error');
  }
}

/**
 * Validates focused email input has no error.
 * This is ony a quick validation.
 * Emails should be validated in the backend.
 */
function emailInput(e) {
  const isEmmail = e.target.value.search(/^\S+@\S+\.\S+$/);

  if (isEmmail !== -1) {
    formValidationConfig.email = true;
    email.classList.remove('error');
  }
}

/**
 * Validates email and handles validation styles.
 * This is ony a quick validation.
 * Emails should be validated in the backend.
 */
function emailBlur(e) {
  const isEmmail = e.target.value.search(/^\S+@\S+\.\S+$/);

  if (isEmmail !== -1) {
    formValidationConfig.email = true;
    email.classList.remove('error');
  } else {
    formValidationConfig.email = false;
    email.classList.add('error');
  }
}
