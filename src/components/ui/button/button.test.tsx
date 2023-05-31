import { Button } from "./button";
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from "react-test-renderer";
import React from 'react';

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
});
