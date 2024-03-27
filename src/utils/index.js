export function validateEmail(email) {
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  let isValid = true;
  let message = "";

  if (email.trim() === "") {
    isValid = false;
    message = "Email is required!";
  } else if (!emailRegex.test(email)) {
    isValid = false;
    message = "Email is not valid!";
  }

  return [isValid, message];
}

export function validatePassword(password, confirmPassword) {
  // Password must include at least one of each below:
  // an uppercase, a lowercase, a number and a special character
  const passwordRegex =
    /^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).*$/;

  let valid = true;
  let message = "";

  if (password.length < 10) {
    valid = false;
    message = "Password must be at least 10 characters long!";
  } else if (!passwordRegex.test(password)) {
    valid = false;
    message = "Password does not meet criteria!";
  } else if (password !== confirmPassword) {
    valid = false;
    message = "Passwords do no match!";
  }

  return [valid, message];
}

export function convertLocalDateTimeToMilliseconds(date, time) {
  const dateTimeString = `${date}T${time}`;
  const givenDate = new Date(dateTimeString);

  return givenDate.getTime();
}
