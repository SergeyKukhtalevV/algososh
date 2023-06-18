import {
  BASE_URL,
  CIRCLE,
  DEFAULT_COLOR, FIBONACCI,
  INPUT,
  SUBMIT_BUTTON
} from "../constans";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const test = 7;
const arrayFibonacci = [0, 1, 1, 2, 3, 5, 8, 13];
describe('should work submit button and algorithm on the fibonacci-page', () => {

  it('should be disabled button, when removed number', () => {
    cy.visit(BASE_URL + FIBONACCI);
    cy.get(INPUT).type(test);
    cy.get(SUBMIT_BUTTON).should('not.be.disabled');
    cy.get(INPUT).clear();
    cy.get(SUBMIT_BUTTON).should('be.disabled');
  });

  it('should work algorithm fibonacci', () => {
    cy.visit(BASE_URL + FIBONACCI);
    cy.clock();
    cy.get(INPUT).type(test);
    cy.get(SUBMIT_BUTTON).click();
    cy.tick(SHORT_DELAY_IN_MS);
    for (let i = 0; i < test; i++) {
      cy.tick(SHORT_DELAY_IN_MS);
      cy.get(CIRCLE).eq(i).should('have.css', 'border', DEFAULT_COLOR).contains(arrayFibonacci[i]);
    }
  });
});

