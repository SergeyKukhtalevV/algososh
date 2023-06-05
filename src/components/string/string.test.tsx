import {unwrapString} from "../../utils/utils";
describe('unwrapStringFunction', () => {
  const setLoader = jest.fn();
  const setArray = jest.fn();

  const tests = [
    {inputValue: 'abcd', result: 'dcba'},
    {inputValue: 'abcde', result: 'edcba'},
    {inputValue: 'a', result: 'a'},
    {inputValue: '', result: ''},
  ];
  test.each(tests)('unwrapStringFunction %s', async ({inputValue, result}) => {
    const outputValue = await unwrapString(inputValue, setLoader, setArray);
    expect(outputValue).toEqual(result);
  });
});
