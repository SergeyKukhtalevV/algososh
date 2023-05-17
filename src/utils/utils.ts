import {TNumber} from "../types/element";
import {Dispatch, SetStateAction} from "react";
import {ElementStates} from "../types/element-states";
import {SHORT_DELAY_IN_MS} from "../constants/delays";

export const setDelay = (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const swap = (array: any[], i: number, j: number) => {
  ([array[i], array[j]] = [array[j], array[i]]);
}

export const getFibonacciArray = (n: number) => {
  const arr: number[] = [];
  for (let i = 0; i < n ; i++) {
    if (i < 2) {
      arr[i] = i;
    } else {
      arr[i] = arr[i - 1] + arr[i - 2];
    }
  }
  return arr;
}

export const getRandomArr = (minLen: number, maxLen: number): number[] => {
  const arr: number[] = [];
  const arrLength = Math.floor(Math.random() * (maxLen - minLen) + minLen);
  for (let i = 0; i < arrLength; i++) {
    arr[i] = Math.floor(Math.random() * 100);
  }
  return arr;
}

export const selectionSort = async (

  arr: TNumber[],
  setLoader: Dispatch<SetStateAction<boolean>>,
  setArray: Dispatch<SetStateAction<typeof arr>>,
  sortDirection = true) => {

  setLoader(true);

  const {length} = arr;
  for (let i = 0; i < length - 1; i++) {
    let currInd = i;
    for (let j = i + 1; j < length; j++) {
      arr[i].color = ElementStates.Changing;
      arr[j].color = ElementStates.Changing;
      setArray([...arr]);
      await setDelay(SHORT_DELAY_IN_MS);
      if (sortDirection) {
        if (arr[currInd].value > arr[j].value) {
          currInd = j;
        }
      } else {
        if (arr[currInd].value < arr[j].value) {
          currInd = j;
        }
      }

      arr[j].color = ElementStates.Default;
    }
    swap(arr, i, currInd);
    arr[i].color = ElementStates.Modified;

  }
  arr[length - 1].color = ElementStates.Modified;
  setArray([...arr]);
  setLoader(false);
}

export const bubbleSort = async (
  arr: TNumber[],
  setLoader: Dispatch<SetStateAction<boolean>>,
  setArray: Dispatch<SetStateAction<typeof arr>>,
  sortDirection = true) => {
  setLoader(true);

  const {length} = arr;
  for (let i = length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      arr[j].color = ElementStates.Changing;
      arr[j + 1].color = ElementStates.Changing;
      setArray([...arr]);
      await setDelay(SHORT_DELAY_IN_MS);
      if (sortDirection) {
        if (arr[j].value > arr[j + 1].value) {
          swap(arr, j + 1, j);
        }
      } else {
        if (arr[j + 1].value < arr[j].value) {
          swap(arr, j + 1, j);
        }
      }

      arr[j+1].color = ElementStates.Modified;
      arr[j].color = ElementStates.Default;
    }
    arr[i].color = ElementStates.Modified;
  }

  setArray([...arr]);
  setLoader(false);
}
