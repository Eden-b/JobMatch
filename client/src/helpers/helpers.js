export function objToLowerString(obj) {
  for (let key in obj) {
    const value = obj[key];
    if (key.toLowerCase() === 'password') continue;
    obj[key] = value.toLowerCase();
  }
  return obj;
}
