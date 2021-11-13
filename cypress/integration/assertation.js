//<reference types="cypress" />

describe('Asertation on Trello', ()=>{
    
    beforeEach("Login", ()=>{
        cy.setupAsserTests()
        cy.login()
        cy.wait('@login')
    })
    // afterEach('Logout', ()=>{
    //     cy.get("div[data-cy='logged-user']").should('be.visible').click({force:true})
    //     cy.get('#myDropdown').click()
    //     cy.get("[data-cy=login-menu]").should('contain', 'Log in')
    // })
    it('Ovo je prvi test', ()=>{
        cy.create()

        cy
            .url()
            .then((url) => {
                const id = url.match(/\/(\d+?)$/)

                cy
                    .url()
                    .should(
                        'eq',
                        `${Cypress.config('baseUrl')}/board/${id[1]}`
                    )
            })

            cy.go('back')

        cy.get("[data-cy='board-item']").trigger('mouseover')
        cy.get("[data-cy='star']").click()
        cy.get('[data-cy=favorite-boards]')
            .children()
            .should('have.length', 1)
    })

    it('List item and assertion', ()=>{
        cy.get("[data-cy='create-board']").click()
        cy.get("[data-cy=new-board-input]").type("Test{enter}")
        cy.visit('/')
        cy.get('[data-cy=board-item]>[data-cy="Test"]').click()
        cy.get('[data-cy=add-list]').type('Nova lista{enter}')
        for(let i=0;i<=2;i++){
        cy.get('[data-cy=new-task]').click({force: true})
        cy.get('[data-cy=task-input]').type(`Task ${i+1}{enter}`)
    }
    })
    
})