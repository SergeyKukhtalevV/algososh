import {TElement} from "../types/element";

export const setDelay = (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const swap = (array: TElement[], i: number, j: number) => {
  ([array[i], array[j]] = [array[j], array[i]]);
}

export const getFibonacciArray = (n: number) => {
  const arr: number[] = [];
  for (let i = 0; i <= n + 1; i++) {
    if (i < 2) {
      arr[i] = i;
    } else {
      arr[i] = arr[i - 1] + arr[i - 2];
    }
  }
  return arr;
}

export const getRandomArr = (minLen: number, maxLen: number):number[] => {
  const arr: number[] = [];
  const arrLength = Math.floor(Math.random()*(maxLen - minLen) + minLen);
  for(let i = 0; i < arrLength; i++) {
    arr[i] = Math.floor(Math.random()*100);
  }
  return arr;
}
