import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from './list-page.module.css';
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<string | number>('');
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const handleInputIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  }
  return (
    <SolutionLayout title="Связный список">
      <div className={style.wrapper}>
        <div className={style.container}>
          <Input type={"text"} maxLength={4} isLimitText={true} onChange={handleInputValue} value={inputValue}/>
          <div className={style.changeButtons}>
            <Button linkedList="big" text={'Добавить в head'}/>
            <Button linkedList="big" text={'Добавить в tail'}/>
            <Button linkedList="big" text={'Удалить из head'}/>
            <Button linkedList="big" text={'Удалить из tail'}/>
          </div>
        </div>
        <div className={style.container}>
          {/*TODO обдумаь макс и мин границы ввода индекса index < 0 || index > this.size*/}
          <Input type={"number"} onChange={handleInputIndex}
                 value={Number(inputIndex)}/>
          <div className={style.changeButtons}>
            <Button linkedList="big" text={'Добавить по индексу'}/>
            <Button linkedList="big" text={'Удалить по индексу'}/>
          </div>
        </div>
        <ul className={style.containerResult}>
          <li>
            <Circle/>
          </li>
        </ul>
      </div>
    </SolutionLayout>
  );
};
