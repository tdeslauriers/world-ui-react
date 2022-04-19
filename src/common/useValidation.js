export function commonNameChars(name) {
  const regex = /^[\p{L}\p{Zs}\p{Pd}'.]+$/u;
  return regex.test(name);
}
