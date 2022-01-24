// Elements
const form = document.getElementById('contact-info');
const user = document.getElementById('name');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const button = document.getElementById('form__btn');

// Event Listeners
user.addEventListener('input', e => nameValidate(e));
user.addEventListener('blur', e => nameValidate(e));
phone.addEventListener('input', e => phoneValidate(e));
phone.addEventListener('blur', e => phoneValidate(e));
email.addEventListener('input', e => emailValidate(e));
email.addEventListener('blur', e => emailValidate(e));

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
 * Validates the focused name.
 */
function nameValidate(e) {
  const nameLength = e.target.value.length > 2;
  validationStylesHandler(user, nameLength, 'name', e.type);
}

/**
 * Mask phone number with: (XXX) XXX-XXXX
 * Validates phone number.
 */
function phoneValidate(e) {
  const isPhoneNum = e.target.value.search(/\(\d{3}\)\s\d{3}-\d{4}/) !== -1;
  const x = e.target.value
    .replace(/\D/g, '')
    .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  e.target.value = !x[2]
    ? x[1]
    : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

  validationStylesHandler(phone, isPhoneNum, 'phone', e.type);
}

/**
 * Validates email.
 */
function emailValidate(e) {
  const isEmail = e.target.value.search(/^\S+@\S+\.\S+$/) !== -1;
  validationStylesHandler(email, isEmail, 'email', e.type);
}

/**
 * Handles validation styles.
 */
function validationStylesHandler(el, validity, input, type) {
  if (!validity && type === 'blur') {
    formValidationConfig[input] = false;
    el.classList.add('error');
  } else if (validity) {
    formValidationConfig[input] = true;
    el.classList.remove('error');
  }
}
