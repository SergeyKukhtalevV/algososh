import {
  BASE_URL, CLEAR_BUTTON, CHANGING_COLOR,
  CIRCLE,
  DEFAULT_COLOR, INPUT, RESET_BUTTON, STACK,
  SUBMIT_BUTTON
} from "../constans";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const text = 'text';
const testArray = ['1A', '2B', '3C', '4D'];
describe('should work submit button and algorithm on the stack-page', () => {

  it('should be disabled button, when removed text', () => {
    cy.visit(BASE_URL + STACK);
    cy.get(SUBMIT_BUTTON).should('be.disabled');
    cy.get(INPUT).type(text);
    cy.get(SUBMIT_BUTTON).should('not.be.disabled');
    cy.get(INPUT).clear();
    cy.get(SUBMIT_BUTTON).should('be.disabled');
  });

});
describe('should work algorithm stack', () => {

  it('should add items in the stack', () => {
    cy.visit(BASE_URL + STACK);
    cy.clock();
    for (let i = 0; i < testArray.length; i++) {
      cy.get(INPUT).type(testArray[i]);
      cy.get(SUBMIT_BUTTON).click();

      for (let j = 0; j <= i; j++) {
        cy.get(CIRCLE)
          .eq(j)
          .should("have.css", "border", j === i ? CHANGING_COLOR : DEFAULT_COLOR)
          .contains(testArray[j]);
      }
      cy.tick(SHORT_DELAY_IN_MS);
      for (let j = 0; j <= i; j++) {
        cy.get(CIRCLE).eq(j).should("have.css", "border", DEFAULT_COLOR).contains(testArray[j]);
      }
    }
  });
  it('should deleted item from the stack', () => {
    cy.visit(BASE_URL + STACK);
    cy.clock();
    for (let i = 0; i < testArray.length; i++) {
      cy.get(INPUT).type(testArray[i]);
      cy.get(SUBMIT_BUTTON).click();
      cy.tick(SHORT_DELAY_IN_MS);
    }
    cy.get(CIRCLE).should("have.length", testArray.length);
    let lengthRenderArray = testArray.length;
    for (let i = 0; i < testArray.length; i++) {
      cy.tick(SHORT_DELAY_IN_MS);
      cy.get(CLEAR_BUTTON).click();
      if (lengthRenderArray === 0) {
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(CIRCLE).should("have.length", 0).should("not.exist");
        break;
      } else {
        for (let j = 0; j < lengthRenderArray; j++) {
          if (j !== lengthRenderArray - 1) {
            cy.get(CIRCLE).eq(j).should("have.css", "border", DEFAULT_COLOR).contains(testArray[j]);
          } else {
            cy.get(CIRCLE).eq(j).should("have.css", "border", CHANGING_COLOR).contains(testArray[j]);
          }
        }
      }
      lengthRenderArray--;
    }

  });

  it('should removed all items in the stack', () => {
    cy.visit(BASE_URL + STACK);
    cy.clock();
    cy.get(RESET_BUTTON).should("be.disabled");
    for (let i = 0; i < testArray.length; i++) {
      cy.get(INPUT).type(testArray[i]);
      cy.get(SUBMIT_BUTTON).click();
      cy.tick(SHORT_DELAY_IN_MS);
    }
    cy.get(RESET_BUTTON).should("not.be.disabled").click();
    cy.get(CIRCLE).should("not.exist");
  });
})
