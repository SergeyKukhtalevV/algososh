import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from "./stack-page.module.css";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {Circle} from "../ui/circle/circle";


export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("abcd");


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  return (
    <SolutionLayout title="Стек">
      <div className={style.wrapper}>
        <div className={style.container}>
          <Input type={"text"} maxLength={4} isLimitText={true} onChange={handleInput} value={inputValue}/>
          <div className={style.changeButtons}>
            <Button text={'Добавить'}/>
            <Button text={'Удалить'}/>
          </div>
          <Button text={'Очистить'}/>
        </div>
        <ul className={style.containerResult}>
          <li>
            <Circle letter={inputValue} head={""}/>
          </li>
          <li>
            <Circle letter={inputValue} head={"top"}/>
          </li>
        </ul>
      </div>
    </SolutionLayout>
  );
};
