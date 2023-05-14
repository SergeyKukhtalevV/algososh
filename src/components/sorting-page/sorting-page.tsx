import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from "./sorting-page.module.css";
import {Button} from "../ui/button/button";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Direction} from "../../types/direction";
import {TNumber} from "../../types/element";
import {ElementStates} from "../../types/element-states";
import {getRandomArr} from "../../utils/utils";
import {maxLenArr, minLenArr} from "../../constants/element-captions";
import {Column} from "../ui/column/column";


export const SortingPage: React.FC = () => {
  const [typeSorting, setTypeSorting] = React.useState<string>('selection');
  const [loader, setLoader] = useState(false);
  const [arrayToRender, setArrayToRender] = useState<TNumber[]>([]);

  const handleSortingIncrease = (array: TNumber[]) => {
    if (typeSorting === 'selection') {
      //TODO вызвать функцию сортирвки выбором по возрастанию
    } else {
      //TODO вызвать функцию сортирвки пузырьком по возрастанию
    }
  }
  const handleSortingDecrease = (array: TNumber[]) => {
    if (typeSorting === 'selection') {
      //TODO вызвать функцию сортирвки выбором по убыванию
    } else {
      //TODO вызвать функцию сортирвки пузырьком по убыванию
    }
  }
  const getarrayToRender = () => {
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
            <Button text={'По возрастанию'} isLoader={loader} sorting={Direction.Ascending}
                    onClick={() => handleSortingIncrease(arrayToRender)}/>
            <Button text={'По убыванию'} isLoader={loader} sorting={Direction.Descending}
                    onClick={() => handleSortingDecrease(arrayToRender)}/>
          </div>
          <Button text={'Новый массив'} onClick={getarrayToRender} disabled={loader}/>
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
