import {
  BASE_URL, CLEAR_BUTTON, CHANGING_COLOR,
  CIRCLE,
  DEFAULT_COLOR, INPUT, RESET_BUTTON, STACK,
  SUBMIT_BUTTON, QUEUE
} from "../constans";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const text = 'text';
const testArray = ['1A', '2B', '3C', '4D'];
describe('should work submit button and algorithm on the queue-page', () => {

  it('should be disabled button, when removed text', () => {
    cy.visit(BASE_URL + QUEUE);
    cy.get(SUBMIT_BUTTON).should('be.disabled');
    cy.get(INPUT).type(text);
    cy.get(SUBMIT_BUTTON).should('not.be.disabled');
    cy.get(INPUT).clear();
    cy.get(SUBMIT_BUTTON).should('be.disabled');
  });

});
