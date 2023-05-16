import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from "./sorting-page.module.css";
import {Button} from "../ui/button/button";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Direction} from "../../types/direction";
import {TNumber} from "../../types/element";
import {ElementStates} from "../../types/element-states";
import {bubbleSort, getRandomArr, selectionSort} from "../../utils/utils";
import {maxLenArr, minLenArr} from "../../constants/element-captions";
import {Column} from "../ui/column/column";


export const SortingPage: React.FC = () => {
  const [typeSorting, setTypeSorting] = useState<string>('selection');
  const [loaderInc, setLoaderInc] = useState(false);
  const [loaderDec, setLoaderDec] = useState(false);
  const [arrayToRender, setArrayToRender] = useState<TNumber[]>([]);

  const handleSortingIncrease = (arr: TNumber[]) => {
    if (typeSorting === 'selection') {
      //TODO вызвать функцию сортирвки выбором по возрастанию

      selectionSort(arr, setLoaderInc, setArrayToRender);

    } else {
      bubbleSort(arr, setLoaderInc, setArrayToRender);
      //TODO вызвать функцию сортирвки пузырьком по возрастанию
    }
  }
  const handleSortingDecrease = (arr: TNumber[]) => {
    if (typeSorting === 'selection') {
      //TODO вызвать функцию сортирвки выбором по убыванию
      selectionSort(arr, setLoaderDec, setArrayToRender,false);

    } else {
      //TODO вызвать функцию сортирвки пузырьком по убыванию
      bubbleSort(arr, setLoaderInc, setArrayToRender, false);
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
              setTypeSorting('bubble')
            }}/>
          </div>
          <div className={style.directionSortingButtons}>
            <Button text={'По возрастанию'} isLoader={loaderInc} sorting={Direction.Ascending} disabled={loaderDec || arrayToRender.length === 0}
                    onClick={() => handleSortingIncrease(arrayToRender)} linkedList="big"/>
            <Button text={'По убыванию'} isLoader={loaderDec} sorting={Direction.Descending} disabled={loaderInc || arrayToRender.length === 0}
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
