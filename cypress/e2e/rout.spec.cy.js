import {BASE_URL} from "../constans";

describe('Routing app', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });
  const pagesApp = [
    {url: 'recursion', text: 'Строка'},
    {url: 'fibonacci', text: 'Последовательность Фибоначчи'},
    {url: 'sorting', text: 'Сортировка массива'},
    {url: 'stack', text: 'Стек'},
    {url: 'queue', text: 'Очередь'},
    {url: 'list', text: 'Связный список'}
  ];
  pagesApp.forEach(({url, text}) => {
    it(`should open ${url} page`, () => {
      cy.visit(BASE_URL + url);
      cy.contains(text);
    });
  });
});
