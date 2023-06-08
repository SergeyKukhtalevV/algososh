import {BASE_URL} from "../constans";

describe('App is available', () => {
  it('should be available on localhost:3000', () => {
    cy.visit(BASE_URL);
    cy.contains('МБОУ АЛГОСОШ');
  });
});
