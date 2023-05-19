import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from './list-page.module.css';
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {TElement, TNumber} from "../../types/element";
import {getRandomArr, setDelay} from "../../utils/utils";
import {LinkedList, Node} from "./LinkedList";
import {ElementStates} from "../../types/element-states";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string | number>('');
  const [inputIndex, setInputIndex] = useState<string | number>('');
  const [linkedList] = useState(new LinkedList<TElement | TNumber>(getRandomArr(2, 4).map((value: number) => {
    return {value, color: ElementStates.Default};
  })));
  const [arrayToRender, setArrayToRender] = useState(linkedList.toArray());
  const [loaderAddHead, setLoaderAddHead] = useState(false);
  const [loaderAddTail, setLoaderAddTail] = useState(false);
  const [loaderDelHead, setLoaderDelHead] = useState(false);
  const [loaderDelTail, setLoaderDelTail] = useState(false);
  const [loaderAddByIndex, setLoaderAddByIndex] = useState(false);
  const [loaderDelByIndex, setLoaderDelByIndex] = useState(false);
  const [addedNode, setAddedNode] = useState<Node<TElement | TNumber> | null>(null);
  const [addedIndex, setAddedIndex] = useState<number>(-1);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const handleInputIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  }

  const handlePrependInList = async (inputValue: string | number) => {
    setLoaderAddHead(true);
    setAddedIndex(0);
    await setDelay(SHORT_DELAY_IN_MS);

    linkedList.prepend({
      value: `${inputValue}`,
      color: ElementStates.Modified
    });

    await setDelay(SHORT_DELAY_IN_MS);
    setArrayToRender(linkedList.toArray());
    setAddedNode(linkedList.getLastAddedNode());

    linkedList.getLastAddedNode()!.value = {
      value: `${inputValue}`,
      color: ElementStates.Default
    };

    await setDelay(SHORT_DELAY_IN_MS);
    setArrayToRender(linkedList.toArray());
    setInputValue("");
    setLoaderAddHead(false);
    setAddedNode(null);
    setAddedIndex(-1);
  }

  const handleAppendInList = async (inputValue: string | number) => {
    setLoaderAddHead(true);
    setAddedIndex(linkedList.getLength() - 1);
    await setDelay(SHORT_DELAY_IN_MS);

    linkedList.append({
      value: `${inputValue}`,
      color: ElementStates.Modified
    });

    await setDelay(SHORT_DELAY_IN_MS);
    setArrayToRender(linkedList.toArray());
    setAddedNode(linkedList.getLastAddedNode());
    setAddedIndex(-1);
    linkedList.getLastAddedNode()!.value = {
      value: `${inputValue}`,
      color: ElementStates.Default
    };

    await setDelay(SHORT_DELAY_IN_MS);
    setArrayToRender(linkedList.toArray());
    setInputValue("");
    setLoaderAddHead(false);
    setAddedNode(null);
  }
  return (
    <SolutionLayout title="Связный список">
      <div className={style.wrapper}>
        <div className={style.container}>
          <Input type={"text"} maxLength={4} isLimitText={true} onChange={handleInputValue} value={inputValue}/>
          <div className={style.changeButtons}>
            <Button isLoader={loaderAddHead} linkedList="big" text={'Добавить в head'}
                    disabled={!inputValue || loaderAddTail || loaderDelHead || loaderDelTail || loaderAddByIndex || loaderDelByIndex}
                    onClick={() => {
                      handlePrependInList(inputValue)
                    }}/>
            <Button isLoader={loaderAddTail} linkedList="big" text={'Добавить в tail'}
                    disabled={!inputValue || loaderAddHead || loaderDelHead || loaderDelTail || loaderAddByIndex || loaderDelByIndex}
                    onClick={() => {
                      handleAppendInList(inputValue)
                    }}/>
            <Button isLoader={loaderDelHead} linkedList="big" text={'Удалить из head'}
                    disabled={loaderAddHead || loaderAddTail || loaderDelTail || loaderAddByIndex || loaderDelByIndex}/>
            <Button isLoader={loaderDelTail} linkedList="big" text={'Удалить из tail'}
                    disabled={loaderAddHead || loaderAddTail || loaderDelHead || loaderAddByIndex || loaderDelByIndex}/>
          </div>
        </div>
        <div className={style.container}>
          {/*TODO обдумаь макс и мин границы ввода индекса index < 0 || index > this.length*/}
          <Input type={"number"} onChange={handleInputIndex}
                 value={Number(inputIndex)}/>
          <div className={style.changeButtons}>
            <Button isLoader={loaderAddByIndex} linkedList="big" text={'Добавить по индексу'}
                    disabled={!inputIndex || loaderAddHead || loaderAddTail || loaderDelHead || loaderDelTail || loaderDelByIndex}/>
            <Button isLoader={loaderDelByIndex} linkedList="big" text={'Удалить по индексу'}
                    disabled={!inputIndex || loaderAddHead || loaderAddTail || loaderDelHead || loaderAddByIndex || loaderDelTail}/>
          </div>
        </div>
        <ul className={style.containerResult}>
          {arrayToRender.map((item, index: number) => {
            return (
              <li key={index} className={style.node}>
                {addedIndex === index
                  ? <Circle
                    state={ElementStates.Changing}
                    isSmall={true}
                    letter={`${inputValue}`}
                    extraClass={style.addedNode}
                  />
                  : null}
                <Circle key={index} index={index} letter={`${item.value.value}`} state={item.value.color}
                        head={index === 0 && !loaderAddHead ? 'head' : ''}
                        tail={item.next === null ? 'tail' : ''}/>
                {item.next && <ArrowIcon fill={item.value.color === ElementStates.Changing ? '#D252E1' : undefined}/>}
              </li>
            )
          })}

        </ul>
      </div>
    </SolutionLayout>
  );
};
