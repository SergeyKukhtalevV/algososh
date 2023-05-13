import {TElement} from "../types/element";

export const setDelay = (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const swap = (array: TElement[], i: number, j: number) => {
  ([array[i], array[j]] = [array[j], array[i]]);
}
