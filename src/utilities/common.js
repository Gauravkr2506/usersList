export function Debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function allowOnlyAlphabets(e) {
  if (!/^[A-Za-z]+$/.test(e.key)) {
    e.preventDefault();
  }
}

export function allowOnlyNumeric(e) {
  if (!/^[0-9]+$/.test(e.key)) {
    e.preventDefault();
  }
}
