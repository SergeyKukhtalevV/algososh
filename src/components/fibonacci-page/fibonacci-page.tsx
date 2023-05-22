import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from './fibonacci-page.module.css'
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {getFibonacciArray, setDelay} from '../../utils/utils'
import {Circle} from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS} from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [inputValue, setInputValue] = useState<number>(1);
  const [fibonacciArray, setFibonacciArray] = useState<number[]>([])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
  };

  const handleClick = async () => {
    setLoader(true);
    const array = getFibonacciArray(inputValue);
    for (let i = 0; i <= array.length; i++) {
      await setDelay(SHORT_DELAY_IN_MS);
      setFibonacciArray(array.slice(0, i));
    }
    setLoader(false);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={style.wrapper}>
        <div className={style.container}>
          <Input type={"number"} max={19} isLimitText={true} onChange={handleInput} value={inputValue}/>
          <Button text={'Рассчитать'}
                  linkedList={'small'}
                  isLoader={loader}
                  disabled={!(inputValue <= 19 && inputValue >= 1)}
                  onClick={handleClick}
          />
        </div>
        <ul className={style.containerResult}>
          {fibonacciArray.map((item: number, index) => {
            return (
              <li key={index}>
                <Circle letter={`${item}`} index={index + 1}/>
              </li>
            )
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
