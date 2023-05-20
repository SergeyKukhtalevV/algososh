import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from './list-page.module.css';
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {TElement, TNumber} from "../../types/element";
import {getRandomArr, setDelay} from "../../utils/utils";
import {LinkedList} from "./LinkedList";
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

  const [addedIndex, setAddedIndex] = useState<number>(-1);
  const [addNode, setAddNode] = useState(false);
  const [deletedIndex, setDeletedIndex] = useState<number>(-1);
  const [deletedNodeValue, setDeletedNodeValue] =
    useState<string | number>('');
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const [deleted, setDeleted] = useState(false);
  const handleInputIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  }

  const handlePrependInList = async (inputValue: string | number) => {
    setLoaderAddHead(true);
    setAddedIndex(linkedList.getLength());
    setAddNode(true);
    await setDelay(SHORT_DELAY_IN_MS);

    linkedList.prepend({
      value: `${inputValue}`,
      color: ElementStates.Modified
    });

    await setDelay(SHORT_DELAY_IN_MS);
    setArrayToRender(linkedList.toArray());

    linkedList.getLastAddedNode()!.value = {
      value: `${inputValue}`,
      color: ElementStates.Default
    };

    await setDelay(SHORT_DELAY_IN_MS);
    setArrayToRender(linkedList.toArray());
    setInputValue("");
    setLoaderAddHead(false);
    setAddNode(true);
    setAddedIndex(-1);
  }

  const handleAppendInList = async (inputValue: string | number) => {
    setLoaderAddTail(true);
    setAddedIndex(1);
    setAddNode(true);
    await setDelay(SHORT_DELAY_IN_MS);

    linkedList.append({
      value: `${inputValue}`,
      color: ElementStates.Modified
    });

    await setDelay(SHORT_DELAY_IN_MS);
    setArrayToRender(linkedList.toArray());

    setAddedIndex(-1);
    linkedList.getLastAddedNode()!.value = {
      value: `${inputValue}`,
      color: ElementStates.Default
    };

    await setDelay(SHORT_DELAY_IN_MS);
    setArrayToRender(linkedList.toArray());
    setInputValue("");
    setAddNode(false);
    setLoaderAddTail(false);

  }
  const handleAddedByIndexInList = async (inputValue: string | number, inputIndex: string | number) => {

    setLoaderAddByIndex(true);
    setAddNode(true);
    for (let i = 0; i <= Number(inputIndex); i++) {
      setAddedIndex(linkedList.getLength() - i);
      if (i < Number(inputIndex)) {
        linkedList.findByIndex(i)!.value.color = ElementStates.Changing;
      }
      setArrayToRender(linkedList.toArray());
      await setDelay(SHORT_DELAY_IN_MS);
    }
    setAddNode(false);

    linkedList.insertAt({
      value: `${inputValue}`,
      color: ElementStates.Modified
    }, Number(inputIndex));
    setArrayToRender(linkedList.toArray());
    await setDelay(SHORT_DELAY_IN_MS);
    linkedList.toArray().forEach((item) => {
      item.value.color = ElementStates.Default
    });
    setArrayToRender(linkedList.toArray());
    setAddedIndex(-1);


    await setDelay(SHORT_DELAY_IN_MS);
    setInputValue("");
    setInputIndex("");
    setLoaderAddByIndex(false);

  }

  const handleDeletedHeadFromList = async () => {
    setLoaderDelHead(true);
    setDeleted(true);
    setDeletedNodeValue(linkedList.findByIndex(0)!.value.value);
    await setDelay(SHORT_DELAY_IN_MS);

    setDeletedIndex(linkedList.getLength());

    linkedList.findByIndex(0)!.value.value = '';
    await setDelay(SHORT_DELAY_IN_MS);
    setArrayToRender(linkedList.toArray());
    await setDelay(SHORT_DELAY_IN_MS);
    linkedList.deleteHead();

    setArrayToRender(linkedList.toArray());

    setLoaderDelHead(false);
    setDeletedIndex(-1);
    setDeleted(false);
  }

  const handleDeletedTailFromList = async () => {
    setLoaderDelTail(true);
    setDeleted(true);
    setDeletedIndex(1);
    setDeletedNodeValue(linkedList.findByIndex(linkedList.getLength() - 1)!.value.value);

    linkedList.findByIndex(linkedList.getLength() - 1)!.value.value = '';
    await setDelay(SHORT_DELAY_IN_MS);
    linkedList.deleteTail();

    setArrayToRender(linkedList.toArray());
    await setDelay(SHORT_DELAY_IN_MS);
    setLoaderDelTail(false);
    setDeletedIndex(-1);
    setDeleted(false);
  }

  const handleDeletedByIndexInList = async (inputIndex: string | number) => {
    setDeletedNodeValue(linkedList.findByIndex(Number(inputIndex))!.value.value);
    await setDelay(SHORT_DELAY_IN_MS);

    setLoaderDelByIndex(true);
    for (let i = 0; i <= Number(inputIndex); i++) {
      if (i < Number(inputIndex)) {
        linkedList.findByIndex(i)!.value.color = ElementStates.Changing;
      }
      setArrayToRender(linkedList.toArray());
      await setDelay(SHORT_DELAY_IN_MS);
    }

    setDeleted(true);
    setDeletedIndex(linkedList.getLength() - Number(inputIndex));
    linkedList.findByIndex(Number(inputIndex))!.value.value = '';
    setArrayToRender(linkedList.toArray());

    await setDelay(SHORT_DELAY_IN_MS);
    setDeleted(false);
    linkedList.deleteByIndex(Number(inputIndex));
    setArrayToRender(linkedList.toArray());

    linkedList.toArray().forEach((item) => {
      item.value.color = ElementStates.Default
    });
    setArrayToRender(linkedList.toArray());
    await setDelay(SHORT_DELAY_IN_MS);
    setLoaderDelByIndex(false);
    setDeletedIndex(-1);

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
                    disabled={loaderAddHead || loaderAddTail || loaderDelTail || loaderAddByIndex || loaderDelByIndex}
                    onClick={handleDeletedHeadFromList}/>
            <Button isLoader={loaderDelTail} linkedList="big" text={'Удалить из tail'}
                    disabled={loaderAddHead || loaderAddTail || loaderDelHead || loaderAddByIndex || loaderDelByIndex}
                    onClick={handleDeletedTailFromList}/>
          </div>
        </div>
        <div className={style.container}>

          <Input type={"number"} onChange={handleInputIndex} max={linkedList.getLength() - 1} min={0}
                 value={Number(inputIndex)}/>
          <div className={style.changeButtons}>
            <Button isLoader={loaderAddByIndex} linkedList="big" text={'Добавить по индексу'}
                    disabled={!inputValue || !inputIndex || loaderAddHead || loaderAddTail || loaderDelHead || loaderDelTail || loaderDelByIndex}
                    onClick={() => {
                      handleAddedByIndexInList(inputValue, inputIndex)
                    }}/>
            <Button isLoader={loaderDelByIndex} linkedList="big" text={'Удалить по индексу'}
                    disabled={!inputIndex || loaderAddHead || loaderAddTail || loaderDelHead || loaderAddByIndex || loaderDelTail}
                    onClick={() => {
                      handleDeletedByIndexInList(inputIndex)
                    }}/>
          </div>
        </div>
        <ul className={style.containerResult}>
          {arrayToRender.map((item, index: number) => {
            return (
              <li key={index} className={style.node}>
                {addNode && linkedList.getLength() - addedIndex === index
                  ? <Circle
                    state={ElementStates.Changing}
                    isSmall={true}
                    letter={`${inputValue}`}
                    extraClass={style.addedNode}
                  />
                  : null}
                <Circle key={index} index={index} letter={`${item.value.value}`} state={item.value.color}
                        head={index === 0 && !loaderAddHead && !loaderDelHead && !loaderAddByIndex && !loaderDelByIndex ? 'head' : ''}
                        tail={item.next === null && !loaderAddTail && !loaderDelTail && !loaderAddByIndex && !loaderDelByIndex ? 'tail' : ''}
                />
                {deleted && linkedList.getLength() - deletedIndex === index
                  ? <Circle
                    state={ElementStates.Changing}
                    isSmall={true}
                    letter={`${deletedNodeValue}`}
                    extraClass={style.deletedNode}
                  />
                  : null}
                {item.next && <ArrowIcon fill={item.value.color === ElementStates.Changing ? '#D252E1' : undefined}/>}
              </li>
            )
          })}

        </ul>
      </div>
    </SolutionLayout>
  );
};
