import {
  BASE_URL, CLEAR_BUTTON, CHANGING_COLOR,
  CIRCLE,
  DEFAULT_COLOR, INPUT, SUBMIT_BUTTON, CIRCLE_HEAD, CIRCLE_TAIL, LIST, MODIFIED_COLOR
} from "../constans";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const text = 'text';
const testIndex = 2;
describe('should work submit button and algorithm on the queue-page', () => {

  it('should be disabled buttons, when removed text and index', () => {
    cy.visit(BASE_URL + LIST);
    cy.get(SUBMIT_BUTTON).each((btn) => {
      // eslint-disable-next-line no-unused-expressions,jest/valid-expect
      expect(btn).be.disabled;
    });

    cy.get(CLEAR_BUTTON).eq(2).should('be.disabled');
    cy.get(INPUT).eq(0).type(text);

    cy.get(INPUT).eq(1).type(testIndex);
    cy.get(SUBMIT_BUTTON).each((btn) => {
      // eslint-disable-next-line no-unused-expressions,jest/valid-expect
      expect(btn).not.be.disabled;
    });
    cy.get(INPUT).eq(0).clear();
    cy.get(INPUT).eq(1).clear();
    cy.get(SUBMIT_BUTTON).each((btn) => {
      // eslint-disable-next-line no-unused-expressions,jest/valid-expect
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
  it('removed item in the head', () => {
    cy.visit(BASE_URL + LIST);
    cy.clock();
    cy.get(CLEAR_BUTTON).first().click();
    cy.tick(DELAY_IN_MS);
    cy.tick(DELAY_IN_MS);
    cy.get(CIRCLE).each((circle, index) => {
      cy.wrap(circle)
        .should('have.css', 'border', index === 1 ? CHANGING_COLOR : DEFAULT_COLOR)
        .invoke(text)
        .should(index === 0 ? 'be.empty' : 'not.be.empty');
    });
    cy.tick(DELAY_IN_MS);
    cy.get(CIRCLE)
      .each((circle) => {
        cy.wrap(circle).should('have.css', 'border', DEFAULT_COLOR)
          .should('not.be.empty')
          .invoke(text);
      });
    cy.get(CIRCLE_HEAD).first().contains('head');
    cy.get(CIRCLE_TAIL).last().contains('tail');
  });
  it('added item in the tail', () => {
    cy.visit(BASE_URL + LIST);
    cy.clock();
    cy.get(INPUT).first().type(text);
    cy.get(SUBMIT_BUTTON).eq(1).click();
    cy.get(CIRCLE).each((circle, index) => {
      if (index === 3) {
        cy.wrap(circle).contains(text);
      }
      cy.wrap(circle).should('have.css', 'border', index === 3 ? CHANGING_COLOR : DEFAULT_COLOR).invoke(text);
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

  it('removed item from the tail', () => {
    cy.visit(BASE_URL + LIST);
    cy.clock();
    cy.get(CLEAR_BUTTON).eq(1).click();
    cy.tick(DELAY_IN_MS);
    cy.tick(DELAY_IN_MS);
    cy.get(CIRCLE).each((circle, index) => {
      cy.wrap(circle)
        .should('have.css', 'border', index === 4 ? CHANGING_COLOR : DEFAULT_COLOR)
        .invoke(text)
        .should(index === 4 ? 'be.empty' : 'not.be.empty');
    });
    cy.tick(DELAY_IN_MS);
    cy.get(CIRCLE)
      .each((circle) => {
        cy.wrap(circle).should('have.css', 'border', DEFAULT_COLOR)
          .should('not.be.empty')
          .invoke(text);
      });
    cy.get(CIRCLE_HEAD).first().contains('head');
    cy.get(CIRCLE_TAIL).last().contains('tail');
  });

  it('added item to the index', () => {
    cy.visit(BASE_URL + LIST);
    cy.clock();
    cy.get(INPUT).first().type(text);
    cy.get(INPUT).last().type(testIndex);
    cy.get(SUBMIT_BUTTON).eq(2).click();
    cy.get(CIRCLE).each((circle, index) => {
      if (index === 0) {
        cy.wrap(circle).contains(text);
      }
      cy.wrap(circle).should('have.css', 'border', index < testIndex ? CHANGING_COLOR : DEFAULT_COLOR).invoke(text);
    });
    cy.tick(DELAY_IN_MS);
    cy.tick(DELAY_IN_MS);
    cy.tick(DELAY_IN_MS);
    cy.get(CIRCLE).each((circle, index) => {
      cy.wrap(circle).should(
        'have.css',
        'border',
        index < testIndex ? CHANGING_COLOR : index === testIndex ? MODIFIED_COLOR : DEFAULT_COLOR
      );
      if (index === testIndex) {
        cy.wrap(circle).contains(text);
      }
    });
    cy.tick(DELAY_IN_MS);
    cy.tick(DELAY_IN_MS);
    cy.get(CIRCLE_HEAD).first().contains('head');
    cy.get(CIRCLE_TAIL).last().contains('tail');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE).each((circle) => {
      cy.wrap(circle).should('have.css', 'border', DEFAULT_COLOR).invoke(text);
    });
  });
  it('removed item from the index', () => {
    cy.visit(BASE_URL + LIST);
    cy.clock();
    cy.get(INPUT).last().type(testIndex);
    cy.get(CLEAR_BUTTON).eq(2).click();
    cy.tick(DELAY_IN_MS);
    cy.tick(DELAY_IN_MS);
    cy.tick(DELAY_IN_MS);
    cy.tick(DELAY_IN_MS);
    cy.get(CIRCLE).each((circle, index) => {
      cy.wrap(circle)
        .should('have.css', 'border', index < testIndex  || index === testIndex + 1 ? CHANGING_COLOR : DEFAULT_COLOR)
        .invoke(text)
        .should(index === testIndex ? 'be.empty' : 'not.be.empty');
    });
    cy.tick(DELAY_IN_MS);
    cy.tick(DELAY_IN_MS);
    cy.get(CIRCLE)
      .each((circle) => {
        cy.wrap(circle).should('have.css', 'border', DEFAULT_COLOR)
          .should('not.be.empty')
          .invoke(text);
      });
    cy.get(CIRCLE_HEAD).first().contains('head');
    cy.get(CIRCLE_TAIL).last().contains('tail');
  });
});
