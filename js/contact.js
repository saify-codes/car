const form = document.querySelector("form");
const name = form.elements[0];
const email = form.elements[1];
const phone = form.elements[2];
const message = form.elements[3];
const captchaResult = form.elements[4];

function showSuccessMessage() {
  let container = form.parentElement;
  let errorAlert = container.querySelector(".error-message"); // delete if theres a error alert

  if (errorAlert) {
    container.removeChild(errorAlert);
  }
  container.insertAdjacentHTML(
    "afterbegin",
    `<div class="alert alert-success">Dear ${name.value}, Thank you for your inquiry. One of our team members will be in touch with you shortly</div>`
  );
}

function showValidationError(errors) {
  let container = form.parentElement;
  let wrapper = document.createElement("div");
  let oldAlert = container.querySelector(".error-message");
  let successMessage = container.querySelector(".alert-success");
  wrapper.classList.add("error-message");
  errors.forEach((error) => {
    wrapper.insertAdjacentHTML(
      "afterbegin",
      `
    <div class="alert alert-danger">
        <strong>Error:</strong> ${error}
    </div>
    `
    );
  });

  if (oldAlert) {
    container.removeChild(oldAlert);
  }
  if (successMessage) {
    container.removeChild(successMessage);
  }
  container.insertAdjacentElement("afterbegin", wrapper);
}

function validateEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isDigit(string) {
  let numberRegex = /^\d+$/;
  return numberRegex.test(string);
}

function generateCaptcha() {
  let captcha = document.querySelector("#captcha");
  let x = Math.round(Math.random() * 10);
  let y = Math.round(Math.random() * 10);
  result = x + y;
  captcha.innerText = `what is ${x} + ${y} = ?`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formElements = form.querySelectorAll("input, textarea");
  let errorMessage = [];
  let hasError = false;

  formElements.forEach((element) => {
    // checking every input element is empty or not
    if (element.value.trim() == "") {
      hasError = true;
      errorMessage.push(element.name + " is empty");
    }
  });

  // checking email is valid or not
  if (email.value != "" && !validateEmail(email.value)) {
    hasError = true;
    errorMessage.push("Invalid email");
  }

  // checking phone is valid or not
  if (phone.value != "" && !isDigit(phone.value)) {
    hasError = true;
    errorMessage.push("Invalid phone only numbers are allowed");
  }

  // checking message length exceeds or not
  if (message.value != "" && message.value.length > 500) {
    hasError = true;
    errorMessage.push("message limit exceed must be 500");
  }

  // checking captcha
  if (captchaResult.value != "" && captchaResult.value != result) {
    hasError = true;
    errorMessage.push("captcha failed");
  }

  if (hasError) {
    showValidationError(errorMessage);
  } else {
    // clearing all input values
    formElements.forEach((element) => {
      element.value = "";
    });
    showSuccessMessage();
  }
});

form.addEventListener("reset", () => {
  form.reset();
});

form.addEventListener("focus", () => {});

form.addEventListener("blur", () => {});

generateCaptcha();
