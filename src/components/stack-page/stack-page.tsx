import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from "./stack-page.module.css";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {Circle} from "../ui/circle/circle";
import {TElement} from "../../types/element";
import {Stack} from "./Stack";
import {ElementStates} from "../../types/element-states";
import {setDelay} from "../../utils/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";


export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [loaderPush, setLoaderPush] = useState(false);
  const [loaderPop, setLoaderPop] = useState(false);
  const [arrayToRender, setArrayToRender] = useState<TElement[]>([]);
  const [stack] = useState(new Stack<TElement>());

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handlePushItem = async () => {
    setLoaderPush(true);
    stack.push({value: inputValue, color: ElementStates.Changing});
    setArrayToRender([...stack.getStack()]);
    setInputValue('');
    await setDelay(SHORT_DELAY_IN_MS);
    let item = stack.peak();
    if (item) item.color = ElementStates.Default;
    setArrayToRender([...stack.getStack()]);
    setLoaderPush(false);
  }

  const handlePopItem = async () => {
    setLoaderPop(true);
    let item = stack.peak();
    if (item) item.color = ElementStates.Changing;
    setArrayToRender([...stack.getStack()]);
    stack.pop();
    await setDelay(SHORT_DELAY_IN_MS);
    setArrayToRender([...stack.getStack()]);
    setLoaderPop(false);
  }

  const handleStackClear = () => {
    stack.clearStack();
    setArrayToRender([...stack.getStack()]);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={style.wrapper}>
        <div className={style.container}>
          <Input type={"text"} maxLength={4} isLimitText={true} onChange={handleInput} value={inputValue}/>
          <div className={style.changeButtons}>
            <Button text={'Добавить'} isLoader={loaderPush} disabled={loaderPop || inputValue.length === 0}
                    onClick={handlePushItem} type={"submit"}/>
            <Button text={'Удалить'} isLoader={loaderPop} disabled={loaderPush || stack.getSize() === 0}
                    onClick={handlePopItem} data-cy='remove'/>
          </div>
          <Button text={'Очистить'} disabled={loaderPop || loaderPush || stack.getSize() === 0}
                  onClick={handleStackClear} type={"reset"}/>
        </div>
        <ul className={style.containerResult}>
          {arrayToRender.map((item: TElement, index) => {
            return (
              <li key={index}>
                <Circle index={index} letter={item.value} state={item.color}
                        head={index === arrayToRender.length - 1 ? "top" : ""}/>
              </li>
            )
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
