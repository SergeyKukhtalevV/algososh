import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from './string.module.css'
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import {setDelay, swap} from "../../utils/utils";
import {TElement} from "../../types/element";

export const StringComponent: React.FC = () => {

  const [loader, setLoader] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [arrayToRender, setArrayToRender] = useState<TElement[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = async (inputValue: string) => {

    setLoader(true);
    const array: TElement[] = inputValue.split('').map((value: string) => {
      return {value, color: ElementStates.Default};
    });
    setArrayToRender(array);
    const medium = Math.ceil(array.length / 2);

    for (let i = 0; i < medium; i++) {
      let j = array.length - 1 - i;
      if (i !== j) {
        array[i].color = ElementStates.Changing;
        array[j].color = ElementStates.Changing;
        setArrayToRender([...array]);
        await setDelay(DELAY_IN_MS);
      }

      swap(array, i, j);
      array[i].color = ElementStates.Modified;
      array[j].color = ElementStates.Modified;
      setArrayToRender([...array]);
    }
    setLoader(false);
  }
  return (
    <SolutionLayout title="Строка">
      <div className={style.wrapper}>
        <div className={style.container}>
          <Input maxLength={11} isLimitText={true} onChange={handleInput}/>
          <Button text={'Развернуть'}
                  linkedList={'small'}
                  isLoader={loader}
                  disabled={!inputValue.length}
                  onClick={(e) => handleClick((inputValue))}
          />
        </div>
        <ul className={style.containerResult}>
          {arrayToRender.map((item: TElement, index) => {
            return (
              <li key={index}>
              <Circle letter={item.value} state={item.color} />
            </li>
            )
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
