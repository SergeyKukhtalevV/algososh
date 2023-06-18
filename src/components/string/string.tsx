import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from './string.module.css'
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {unwrapString} from "../../utils/utils";
import {TElement} from "../../types/element";

export const StringComponent: React.FC = () => {

  const [loader, setLoader] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [arrayToRender, setArrayToRender] = useState<TElement[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    unwrapString(inputValue, setLoader, setArrayToRender);
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
                  onClick={handleClick}
                  type={"submit"}
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
