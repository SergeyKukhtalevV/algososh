import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";
import renderer from "react-test-renderer";
import React from 'react';

describe('CircleComponent', () => {
  it('Circle without letter', ()=> {
    const circle = renderer
      .create(<Circle/>)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Circle with letters', ()=> {
    const circle = renderer
      .create(<Circle letter={'abcd'}/>)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Circle with head', ()=> {
    const circle = renderer
      .create(<Circle head={'abcd'}/>)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Circle with React element in head', ()=> {
    const circle = renderer
      .create(<Circle head={<Circle />}/>)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Circle with tail', ()=> {
    const circle = renderer
      .create(<Circle tail={'abcd'}/>)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Circle with React element in tail', ()=> {
    const circle = renderer
      .create(<Circle tail={<Circle />}/>)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Circle with index', ()=> {
    const circle = renderer
      .create(<Circle index={1}/>)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Circle with props isSmall ===  true', ()=> {
    const circle = renderer
      .create(<Circle isSmall={true}/>)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Circle default', ()=> {
    const circle = renderer
      .create(<Circle/>)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Circle changing', ()=> {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing}/>)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it('Circle modified', ()=> {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified}/>)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
});
