import {
  BASE_URL,
  CHANGING_COLOR,
  CIRCLE,
  DEFAULT_COLOR,
  INPUT,
  MODIFIED_COLOR,
  RECURSION,
  SUBMIT_BUTTON
} from "../constans";
import {DELAY_IN_MS} from "../../src/constants/delays";

const text = 'abcd';

describe('should work submit button and algorithms on the recursion\'s page', () => {

  it('should be disabled button, when removed text', () => {
    cy.visit(BASE_URL + RECURSION);
    cy.get(SUBMIT_BUTTON).should('be.disabled');
    cy.get(INPUT).type(text);
    cy.get(SUBMIT_BUTTON).should('not.be.disabled');
    cy.get(INPUT).clear();
    cy.get(SUBMIT_BUTTON).should('be.disabled');
  });

  it('should work algorithm unwrap string', () => {
    cy.visit(BASE_URL + RECURSION);
    cy.clock();
    cy.get(INPUT).type(text);
    cy.get(SUBMIT_BUTTON).click();
    cy.get(CIRCLE).eq(0).as('0');
    cy.get(CIRCLE).eq(1).as('1');
    cy.get(CIRCLE).eq(2).as('2');
    cy.get(CIRCLE).eq(3).as('3');
    cy.get('@0').should('have.css', 'border', CHANGING_COLOR).contains('a');
    cy.get('@1').should('have.css', 'border', DEFAULT_COLOR).contains('b');
    cy.get('@2').should('have.css', 'border', DEFAULT_COLOR).contains('c');
    cy.get('@3').should('have.css', 'border', CHANGING_COLOR).contains('d');
    cy.tick(DELAY_IN_MS);
    cy.get('@0').should('have.css', 'border', MODIFIED_COLOR).contains('d');
    cy.get('@1').should('have.css', 'border', CHANGING_COLOR).contains('b');
    cy.get('@2').should('have.css', 'border', CHANGING_COLOR).contains('c');
    cy.get('@3').should('have.css', 'border', MODIFIED_COLOR).contains('a');
    cy.tick(DELAY_IN_MS);
    cy.get('@0').should('have.css', 'border', MODIFIED_COLOR).contains('d');
    cy.get('@1').should('have.css', 'border', MODIFIED_COLOR).contains('c');
    cy.get('@2').should('have.css', 'border', MODIFIED_COLOR).contains('b');
    cy.get('@3').should('have.css', 'border', MODIFIED_COLOR).contains('a');
  });
});

