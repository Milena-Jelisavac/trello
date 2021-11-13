require('@4tw/cypress-drag-drop');
import 'cypress-file-upload';
import 'cypress-real-events/support';

import './commands';

Cypress.Commands.add('login', (username=Cypress.env('username'), password=Cypress.env('password'))=>{
    
    cy.get('div[data-cy="login-menu"]').click()
    cy.get("[data-cy='login-email']").type(username)
    cy.get("[data-cy='login-password']").type(password)
    cy.get("[data-cy='login']").click()
})

Cypress.Commands.add('setupAsserTests', ()=>{
    cy.request('DELETE',"/api/boards")
    cy.intercept('POST', 'http://localhost:3000/login').as('login')
    cy.visit('/')
})
Cypress.Commands.add('create', ()=>{
    cy.get("[data-cy='create-board']").should(($elem)=>{
        expect($elem).to.contain('Create a board')
    })
    cy.get("[data-cy='create-board']").click()
    cy.get("[data-cy=new-board-input]").type("Test{enter}")
})