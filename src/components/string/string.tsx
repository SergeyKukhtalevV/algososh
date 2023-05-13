import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from './string.module.css'
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";

type TElement = {
  value: string;
  color: ElementStates
}

export const StringComponent: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [inputValue, setInputValue] = useState<TElement[]>([]);

  return (
    <SolutionLayout title="Строка">
      <div className={style.wrapper}>
        <div className={style.container}>
          <Input maxLength={11} isLimitText={true}/>
          <Button text={'Развернуть'}
                  linkedList={'small'}
                  isLoader={loader}
                  disabled={!inputValue.length}

          />
        </div>
        <ul className={style.containerResult}>
          <li>
            <Circle />
          </li>
          <li>
            <Circle />
          </li>
          <li>
            <Circle />
          </li>
          <li>
            <Circle />
          </li>
          <li>
            <Circle />
          </li>
          <li>
            <Circle />
          </li>
          <li>
            <Circle />
          </li>
          <li>
            <Circle />
          </li>
        </ul>
      </div>
    </SolutionLayout>
  );
};
