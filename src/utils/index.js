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
