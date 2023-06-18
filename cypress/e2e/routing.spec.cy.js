import {BASE_URL, FIBONACCI, LIST, QUEUE, RECURSION, SORTING, STACK} from "../constans";

describe('app works correctly with routes', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });
  const pagesApp = [
    {url: RECURSION, text: 'Строка'},
    {url: FIBONACCI, text: 'Последовательность Фибоначчи'},
    {url: SORTING, text: 'Сортировка массива'},
    {url: STACK, text: 'Стек'},
    {url: QUEUE, text: 'Очередь'},
    {url: LIST, text: 'Связный список'}
  ];
  pagesApp.forEach(({url, text}) => {
    it(`should open ${url} page`, () => {
      cy.visit(BASE_URL + url);
      cy.contains(text);
    });
  });
});
