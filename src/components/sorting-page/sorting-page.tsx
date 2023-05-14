import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from "./sorting-page.module.css";
import {Button} from "../ui/button/button";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Direction} from "../../types/direction";
import {TNumber} from "../../types/element";
import {ElementStates} from "../../types/element-states";
import {getRandomArr, setDelay, swap} from "../../utils/utils";
import {maxLenArr, minLenArr} from "../../constants/element-captions";
import {Column} from "../ui/column/column";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";


export const SortingPage: React.FC = () => {
  const [typeSorting, setTypeSorting] = useState<string>('selection');
  const [loaderInc, setLoaderInc] = useState(false);
  const [loaderDec, setLoaderDec] = useState(false);
  const [arrayToRender, setArrayToRender] = useState<TNumber[]>([]);

  const selectionSort = async (arr: TNumber[], sortDirection = true) => {
    setLoaderInc(true);
    console.log(loaderInc);
    const {length} = arr;
    for (let i = 0; i < length - 1; i++) {
      let currInd = i;
      for (let j = i + 1; j < length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArrayToRender([...arr]);
        await setDelay(SHORT_DELAY_IN_MS);
        if(sortDirection) {
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
    setArrayToRender([...arr]);
    setLoaderInc(false);
    console.log(loaderInc);
  }

  const handleSortingIncrease = (arr: TNumber[]) => {
    if (typeSorting === 'selection') {
      //TODO вызвать функцию сортирвки выбором по возрастанию

      selectionSort(arr);

    } else {
      //TODO вызвать функцию сортирвки пузырьком по возрастанию
    }
  }
  const handleSortingDecrease = (arr: TNumber[]) => {
    if (typeSorting === 'selection') {
      //TODO вызвать функцию сортирвки выбором по убыванию
      selectionSort(arr, false);

    } else {
      //TODO вызвать функцию сортирвки пузырьком по убыванию
    }
  }
  const getArrayToRender = () => {
    const array: TNumber[] = getRandomArr(minLenArr, maxLenArr).map((value: number) => {
      return {value, color: ElementStates.Default};
    });
    setArrayToRender(array);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.radioButtons}>
            <RadioInput label={'Выбор'} value={'selection'} name={'typeSorting'} defaultChecked={true}
                        onClick={() => {
                          setTypeSorting('selection')
                        }}/>
            <RadioInput label={'Пузырёк'} value={'bubble'} name={'typeSorting'} onClick={() => {
              setTypeSorting('selection')
            }}/>
          </div>
          <div className={style.directionSortingButtons}>
            <Button text={'По возрастанию'} isLoader={loaderInc} sorting={Direction.Ascending} disabled={loaderDec}
                    onClick={() => handleSortingIncrease(arrayToRender)} linkedList="big"/>
            <Button text={'По убыванию'} isLoader={loaderDec} sorting={Direction.Descending} disabled={loaderInc}
                    onClick={() => handleSortingDecrease(arrayToRender)} linkedList="big"/>
          </div>
          <Button text={'Новый массив'} onClick={getArrayToRender} disabled={loaderInc || loaderDec}/>
        </div>
        <ul className={style.containerResult}>
          {arrayToRender.length
            ? arrayToRender.map((item: TNumber, index: number) => {
              return (
                <li key={index}>
                  <Column state={item.color} index={item.value}/>
                </li>
              )
            })
            : null
          }

        </ul>
      </div>
    </SolutionLayout>
  );
};
