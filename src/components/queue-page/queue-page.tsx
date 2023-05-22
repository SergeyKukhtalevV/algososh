import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from "./queue-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {TElement} from "../../types/element";
import {Circle} from "../ui/circle/circle";
import {Queue} from "./Queue";
import {ElementStates} from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {setDelay} from "../../utils/utils";

export const QueuePage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>("");
  const [loaderEnq, setLoaderEng] = useState(false);
  const [loaderDeq, setLoaderDeg] = useState(false);
  const [queue] = useState(new Queue<TElement>(7));
  const [arrayToRender, setArrayToRender] = useState<TElement[]>(queue.getQueue());

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const handleEnqItem = async () => {
    setLoaderEng(true);
    queue.enqueue({value: inputValue, color: ElementStates.Changing});
    setInputValue("");
    setArrayToRender([...queue.getQueue()]);
    await setDelay(SHORT_DELAY_IN_MS);
    queue.getQueue()[queue.getTail() - 1].color = ElementStates.Default;
    setArrayToRender([...queue.getQueue()]);
    setLoaderEng(false);
  }
  const handleDegItem = async () => {
    setLoaderDeg(true);
    queue.getQueue()[queue.getHead()].color = ElementStates.Changing;
    setArrayToRender([...queue.getQueue()]);
    await setDelay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setArrayToRender([...queue.getQueue()]);
    setLoaderDeg(false);
  }

  const handleQueueClear = () => {
    queue.clearQueue();
    setArrayToRender([...queue.getQueue()]);
  };
  return (
    <SolutionLayout title="Очередь">
      <div className={style.wrapper}>
        <div className={style.container}>
          <Input type={"text"} maxLength={4} isLimitText={true} onChange={handleInput} value={inputValue}/>
          <div className={style.changeButtons}>
            <Button text={'Добавить'} isLoader={loaderEnq}
                    disabled={loaderDeq || inputValue.length === 0 || queue.getLength() === queue.getSize()}
                    onClick={handleEnqItem}/>
            <Button text={'Удалить'} isLoader={loaderDeq} disabled={loaderEnq || queue.isEmpty()}
                    onClick={handleDegItem}/>
          </div>
          <Button text={'Очистить'} disabled={loaderEnq || loaderDeq || queue.isEmpty()}
                  onClick={handleQueueClear}/>
        </div>
        <ul className={style.containerResult}>
          {arrayToRender.map((item: TElement, index) => {
            return (
              <li key={index}>
                <Circle index={index} letter={item.value} state={item.color}
                        head={index === queue.getHead() && !queue.isEmpty() ? "head" : ""}
                        tail={index === queue.getTail() - 1 && !queue.isEmpty() ? "tail" : ""}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
