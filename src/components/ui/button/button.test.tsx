import {Button} from "./button";
import {fireEvent, render, screen} from '@testing-library/react';
import renderer from "react-test-renderer";
import React from 'react';
import {Direction} from "../../../types/direction";

describe('ButtonComponent', () => {
  it('Button with text', ()=> {
    const button = renderer
      .create(<Button text='button' />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('Button without text', ()=> {
    const button = renderer
      .create(<Button />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('Disabled button', ()=> {
    const button = renderer
      .create(<Button disabled={true}/>)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('Button with loader', ()=> {
    const button = renderer
      .create(<Button isLoader={true}/>)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('onClick button callback', ()=> {
    const callback = jest.fn();
    render(<Button onClick={callback}/>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it('Button with sorting-Ascending', ()=> {
    const button = renderer
      .create(<Button sorting={Direction.Ascending}/>)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
    it('Button with sorting-Descending', ()=> {
      const button = renderer
        .create(<Button sorting={Direction.Descending}/>)
        .toJSON();
      expect(button).toMatchSnapshot();
  });
  it('Button with linkedList-small', ()=> {
    const button = renderer
      .create(<Button linkedList={"small"}/>)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('Button with linkedList-big', ()=> {
    const button = renderer
      .create(<Button linkedList={"big"}/>)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
});
