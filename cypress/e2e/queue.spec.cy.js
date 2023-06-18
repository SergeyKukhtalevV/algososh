import {
  BASE_URL, CLEAR_BUTTON, CHANGING_COLOR,
  CIRCLE,
  DEFAULT_COLOR, INPUT, RESET_BUTTON, SUBMIT_BUTTON, QUEUE, CIRCLE_HEAD, CIRCLE_TAIL
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

describe('should work algorithm queue', () => {

  it('should add items in the queue', () => {
    cy.visit(BASE_URL + QUEUE);
    cy.clock();
    cy.get(CIRCLE).eq(0).as("1");
    cy.get(CIRCLE).eq(1).as("2");
    cy.get(CIRCLE).eq(2).as("3");
    cy.get(CIRCLE).eq(3).as("4");


    for (let i = 0; i < testArray.length; i++) {
      const text = testArray[i];
      cy.get(INPUT).type(text);
      cy.get(SUBMIT_BUTTON).click();

      if (i === 0) {
        cy.get("@1").should("have.css", "border", CHANGING_COLOR).contains(text);
      } else {
        cy.get(`@${i}`).should("have.css", "border", DEFAULT_COLOR);
        cy.get(`@${i + 1}`)
          .should("have.css", "border", CHANGING_COLOR)
          .contains(text);
      }
      cy.get(CIRCLE_HEAD).eq(0).contains("head");
      cy.get(CIRCLE_TAIL).eq(i).contains("tail");
      cy.tick(SHORT_DELAY_IN_MS);
    }

    cy.get("@4").should("have.css", "border", DEFAULT_COLOR);
    cy.tick(SHORT_DELAY_IN_MS);
  });

  it('should deleted item from the queue', () => {
    cy.visit(BASE_URL + QUEUE);
    cy.clock();
    for (let i = 0; i < testArray.length; i++) {
      const text = testArray[i];

      cy.get(INPUT).type(text);
      cy.get(SUBMIT_BUTTON).click();
      cy.tick(SHORT_DELAY_IN_MS);
    }

    let lengthRenderArray = testArray.length - 1;

    for (let i = 0; i < testArray.length; i++) {
      cy.get(CLEAR_BUTTON).click();
      if (lengthRenderArray === 0) {
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(CIRCLE)
          .should("have.length", 7)
          .each((item) => {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(item).contain("");
          });
        break;
      }

      cy.get(CIRCLE).eq(i).should("have.css", "border", CHANGING_COLOR).contains(testArray[i]);
      for (let j = i + 1; j < testArray.length; j++) {
        cy.get(CIRCLE).eq(j).should("have.css", "border", DEFAULT_COLOR).contains(testArray[j]);
      }
      cy.get(CIRCLE_HEAD).eq(i).contains("head");
      cy.get(CIRCLE_TAIL).eq(testArray.length - 1).contains("tail");
      cy.tick(SHORT_DELAY_IN_MS);
      cy.get(CIRCLE_HEAD).eq(i + 1).contains("head");
      cy.get(CIRCLE_TAIL).eq(testArray.length - 1).contains("tail");
      lengthRenderArray--;
    }

  });

  it('should removed all items in the queue', () => {
    cy.visit(BASE_URL + QUEUE);
    cy.clock();
    cy.get(RESET_BUTTON).should("be.disabled");
    for (let i = 0; i < testArray.length; i++) {
      const text = testArray[i];

      cy.get(INPUT).type(text);
      cy.get(SUBMIT_BUTTON).click();
      cy.tick(SHORT_DELAY_IN_MS);
    }
    cy.get(RESET_BUTTON).should("not.be.disabled").click();
    cy.get(CIRCLE)
      .should("have.length", 7)
      .each((item) => {
        expect(item).contain("");
      });
  });

});
