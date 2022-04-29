const allowedChars =
  "may only include common naming characters like letters, dashes, spaces, apostrophes, etc.";

export const ERRORS = {
  firstname: "First name  " + allowedChars,
  lastname: "Last name " + allowedChars,
  address: "Street address may not include special characters.",
  city: "City names " + allowedChars,
  zip: "Zip code must be 5 numbers only.",
};

export function commonNameChars(field) {
  const regex = /^[\p{L}\p{Zs}\p{Pd}'.]+$/u;
  return regex.test(field);
}

export function noSpecialChars(field) {
  const regex = /^[\p{L}\p{N}\p{Zs}\p{Pd}\p{Pc}.,]+$/u;
  return regex.test(field);
}

export function isNumbersOnly(field) {
  const regex = /^[\p{N}]+$/u;
  return regex.test(field);
}

export function isPhoneLength(phone) {
  if (phone.length === 9) {
    return true;
  }
  return false;
}

export function isValidStreet(street) {
  if (noSpecialChars(street) || street === "") {
    return true;
  }
  return false;
}

export function isValidCity(city) {
  if (commonNameChars(city) || city === "") {
    return true;
  }
  return false;
}

export function isValidZip(zip) {
  if ((isNumbersOnly(zip) && zip.length === 5) || zip === "") {
    return true;
  }
  return false;
}
