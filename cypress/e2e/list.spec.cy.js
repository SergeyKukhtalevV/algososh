import {
  BASE_URL, CLEAR_BUTTON, CHANGING_COLOR,
  CIRCLE,
  DEFAULT_COLOR, INPUT, RESET_BUTTON, SUBMIT_BUTTON, CIRCLE_HEAD, CIRCLE_TAIL, LIST
} from "../constans";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const text = 'text';
const testArray = ['1A', '2B', '3C', '4D'];
const testIndex = 2;
describe('should work submit button and algorithm on the queue-page', () => {

  it('should be disabled buttons, when removed text and index', () => {
    cy.visit(BASE_URL + LIST);
    cy.get(SUBMIT_BUTTON).each((btn) => {
      expect(btn).should('be.disabled');
    });
    cy.get(CLEAR_BUTTON).each((btn) => {
      expect(btn).should('be.disabled');
    })
    cy.get(INPUT).eq(0).type(text);
    cy.get(INPUT).eq(1).type(testIndex);
    cy.get(SUBMIT_BUTTON).each((btn) => {
      expect(btn).should('not.be.disabled');
    });
    cy.get(INPUT).eq(0).clear();
    cy.get(INPUT).eq(1).clear();
    cy.get(SUBMIT_BUTTON).each((btn) => {
      expect(btn).should('be.disabled');
    });
    cy.get(CLEAR_BUTTON).each((btn) => {
      expect(btn).should('be.disabled');
    })
  });

});
