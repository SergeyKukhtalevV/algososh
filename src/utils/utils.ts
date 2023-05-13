import {TElement} from "../types/element";

export const setDelay = (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const swap = (array: TElement[], i: number, j: number) => {
  ([array[i], array[j]] = [array[j], array[i]]);
}

export const getFibonacciArray = (n: number) => {
  const arr: number[] = [];
  if (n <= 0) {
    return false;
  }
  for (let i = 0; i < n; i++) {
    if (i < 2) {
      arr[i] = i;
    } else {
      arr[i] = arr[i - 1] + arr[i - 2];
    }
  }
  return arr[n - 1];
}
