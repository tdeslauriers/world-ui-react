export function commonNameChars(field) {
  const regex = /^[\p{L}\p{Zs}\p{Pd}'.]+$/u;
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


