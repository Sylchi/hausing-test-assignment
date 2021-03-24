/// <reference types="cypress" />

import Chance from 'chance'
const chance = new Chance();

describe('ServiceDesk', () => {

 beforeEach(() => {
   cy.visit('http://localhost:4200');
 });
 it('has a title', () => {
   cy.contains('Service Desk');
 });
it('can create ticket', () => {
  const email = chance.email();
  cy.contains('Create ticket').click();
  cy.get('.modal-backdrop').children().should('contain', 'New ticket').and('be.visible');
  cy.get('input[name="title"]').type(chance.sentence({ words: 5 }));
  cy.get('input[name="email"]').type(email);
  cy.get('textarea[name="content"]').type(chance.sentence({ words: 20 }));
  cy.get('select[name="priority"]').select('Call the manager');
  cy.contains('Submit').click();
  cy.contains(email);
})
it('can edit ticket', () => {
  const newEmail = chance.email();
  const newTitle = chance.sentence({ words: 5 });
  const newExplanation = chance.sentence({ words: 20 });
  const tr = cy.contains('Open').parent();
  tr.contains('edit').click();
  cy.get('.modal-backdrop').children().should('contain', 'Edit ticket').and('be.visible');
  cy.get('input[name="title"]').clear().type(newTitle);
  cy.get('input[name="email"]').clear().type(newEmail);
  cy.get('textarea[name="content"]').clear().type(newExplanation);
  cy.get('select[name="priority"]').select('Urgent');
  cy.contains('Save').click();
  cy.get('.modal-backdrop').should('not.exist');
  cy.contains(newTitle);
  cy.contains(newEmail);
})
it('can close ticket', () => {
  cy.contains('Open').parent().get('td').first().invoke('text').then(id => {
    cy.contains('Open').parent().contains('edit').click();
    cy.get('.modal-backdrop').children().should('contain', 'Edit ticket').and('be.visible');
    cy.contains('Close ticket').click();
    cy.get('.modal-backdrop').should('not.exist');
    cy.contains(id).parent().contains('Closed')
  });
})
it('does not accept invalid input', () => {
  cy.contains('Create ticket').click();
  cy.get('.modal-backdrop').children().should('contain', 'New ticket').and('be.visible');
  cy.contains('Submit').click();
  cy.get('input:invalid').should('have.length', 2);
  cy.get('input[name="title"]').type(chance.sentence({ words: 5 }));
  cy.contains('Submit').click();
  cy.get('input:invalid').should('have.length', 1);
  cy.get('input[name="email"]').type(chance.email());
  cy.contains('Submit').click();
  cy.get('input:invalid').should('have.length', 0);
  cy.get('textarea:invalid').should('have.length', 1);
  cy.get('textarea[name="content"]').type(chance.sentence({ words: 10 }));
  cy.contains('Submit').click();
  cy.get('textarea:invalid').should('have.length', 0);
  cy.get('select:invalid').should('have.length', 1);
  cy.get('select[name="priority"]').select('Inconvinience');
  cy.contains('Submit').click();
  cy.get('select:invalid').should('have.length', 0);
  cy.get('.modal-backdrop').should('not.exist');
  cy.get('tr').should('have.length.at.least', 2);
})

it('allows sorting rows', () => {
  cy.contains('Priority').click();
  cy.get('#app > main > table > tbody > tr:nth-child(1) > td:nth-child(5)').invoke('text').then(currentValue => {
    expect(currentValue).to.not.equal('Lowest');
    cy.contains('Priority').click();
    cy.get('#app > main > table > tbody > tr:nth-child(1) > td:nth-child(5)').invoke('text').then(newValue => {
      expect(newValue).to.equal('Lowest');
    })
  })
  cy.get('#app > main > table > tbody > tr:nth-child(1) > td:nth-child(6)').invoke('text').then(currentValue => {
    expect(currentValue).to.not.equal('Closed');
    cy.contains('Status').click();
    cy.get('#app > main > table > tbody > tr:nth-child(1) > td:nth-child(6)').invoke('text').then(newValue => {
      expect(newValue).to.equal('Closed');
    })
  })
  cy.contains('Created').click();
  cy.get('#app > main > table > tbody > tr:nth-child(1) > td:nth-child(1)').invoke('text').then(currentValue => {
    cy.contains('Created').click();
    cy.get('#app > main > table > tbody > tr:nth-child(1) > td:nth-child(1)').invoke('text').then(newValue => {
      expect(currentValue).to.not.equal(newValue);
    })
  })
})
})