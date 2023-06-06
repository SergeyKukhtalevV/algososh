import {selectionSort, bubbleSort} from "../../utils/utils";
import {ElementStates} from "../../types/element-states";
import {TNumber} from "../../types/element";

const setLoader = jest.fn();
const setArray = jest.fn();

const inputArr: TNumber[] = [
  {value: 3, color: ElementStates.Default},
  {value: 2, color: ElementStates.Default},
  {value: 5, color: ElementStates.Default},
  {value: 4, color: ElementStates.Default},
  {value: 1, color: ElementStates.Default}];

const outputArrInc: TNumber[] = [
  {value: 1, color: ElementStates.Modified},
  {value: 2, color: ElementStates.Modified},
  {value: 3, color: ElementStates.Modified},
  {value: 4, color: ElementStates.Modified},
  {value: 5, color: ElementStates.Modified}];

const outputArrDec: TNumber[] = [
  {value: 5, color: ElementStates.Modified},
  {value: 4, color: ElementStates.Modified},
  {value: 3, color: ElementStates.Modified},
  {value: 2, color: ElementStates.Modified},
  {value: 1, color: ElementStates.Modified}];

describe.each([
  {sortDirection: 'inc', result: outputArrInc},
  {sortDirection: 'dec', result: outputArrDec}])
('selectionSortArrFunction %s', ({sortDirection, result}) => {

  test('Empty Array', async () => {
    const outputArray = await selectionSort([], setLoader, setArray, sortDirection === 'inc');
    expect(outputArray).toEqual([]);
  });

  test('Array with one element', async () => {
    const outputArray = await selectionSort([
      {value: 1, color: ElementStates.Default}], setLoader, setArray, sortDirection === 'inc');
    expect(outputArray).toEqual([{value: 1, color: ElementStates.Modified}]);
  });

  test('Array with multiple elements', async () => {
    const outputArray = await selectionSort(inputArr, setLoader, setArray, sortDirection === 'inc');
    expect(outputArray).toEqual(result);
  });

});
