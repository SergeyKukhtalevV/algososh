import {BASE_URL} from "../constans";

describe('App is available!', () => {
  it('home URL', () => {
    cy.visit(BASE_URL);
    cy.contains('МБОУ АЛГОСОШ');
  });
});
