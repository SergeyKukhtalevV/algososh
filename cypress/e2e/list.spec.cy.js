import {
  BASE_URL, CLEAR_BUTTON, CHANGING_COLOR,
  CIRCLE,
  DEFAULT_COLOR, INPUT, RESET_BUTTON, SUBMIT_BUTTON, CIRCLE_HEAD, CIRCLE_TAIL, LIST, MODIFIED_COLOR
} from "../constans";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const text = 'text';
const testArray = ['1A', '2B', '3C', '4D'];
const testIndex = 1;
describe('should work submit button and algorithm on the queue-page', () => {

  it('should be disabled buttons, when removed text and index', () => {
    cy.visit(BASE_URL + LIST);
    cy.get(SUBMIT_BUTTON).each((btn) => {
      expect(btn).be.disabled;
    });

    cy.get(CLEAR_BUTTON).eq(2).should('be.disabled');
    cy.get(INPUT).eq(0).type(text);

    cy.get(INPUT).eq(1).type(testIndex);
    cy.get(SUBMIT_BUTTON).each((btn) => {
      expect(btn).not.be.disabled;
    });
    cy.get(INPUT).eq(0).clear();
    cy.get(INPUT).eq(1).clear();
    cy.get(SUBMIT_BUTTON).each((btn) => {
      expect(btn).be.disabled;
    });
    cy.get(CLEAR_BUTTON).eq(2).should('be.disabled');
  });

});
describe('should work algorithm list', () => {
  it('should default list', () => {
    cy.visit(BASE_URL + LIST);
    cy.get(CIRCLE).each((circle) => {
      cy.wrap(circle).should('have.css', 'border', DEFAULT_COLOR).invoke(text).should('not.be.empty');
    });
    cy.get(CIRCLE_HEAD).first().contains('head');
    cy.get(CIRCLE_TAIL).last().contains('tail');
  });

  it('added item in the head', () => {
    cy.visit(BASE_URL + LIST);
    cy.clock();
    cy.get(INPUT).first().type(text);
    cy.get(SUBMIT_BUTTON).first().click();
    cy.get(CIRCLE).each((circle, index) => {
      if (index === 0) {
        cy.wrap(circle).contains(text);
      }
      cy.wrap(circle).should('have.css', 'border', index === 0 ? CHANGING_COLOR : DEFAULT_COLOR).invoke(text);
    });
    cy.tick(DELAY_IN_MS);
    cy.tick(DELAY_IN_MS);
    cy.tick(DELAY_IN_MS);
    cy.get(CIRCLE_HEAD).first().contains('head');
    cy.get(CIRCLE_TAIL).last().contains('tail');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE).each((circle) => {
      cy.wrap(circle).should('have.css', 'border', DEFAULT_COLOR).invoke(text);
    });
  });
});
