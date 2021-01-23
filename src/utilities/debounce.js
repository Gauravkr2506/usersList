export default function Debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    debugger;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
