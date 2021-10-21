//<reference types="cypress" />
const boardQA=require('../fixtures/boardQA.json')
const boards=require('../fixtures/fourBoards.json')
const home=require('../fixtures/home.json')

describe("Stubbing response and asserting data for all boards and for QA board", () => {
   beforeEach("Setting intercept request",()=>{
    cy.intercept("api/boards/63391079216", { fixture: "boardQA.json" }).as("getBoardQA");
    cy.intercept("/api/boards", { fixture: "fourBoards.json" }).as("getBoards");
   })
    it("Stubbing response and asserting data for all boards", () => {
      cy.visit("/");
      cy.wait('@getBoards').its("response").then((res)=>{
        expect(res.body[0].name).to.eq(boards[0].name);
        expect(res.body[1].name).to.eq(boards[1].name);
        expect(res.body[2].name).to.eq(boards[2].name);
        expect(res.body[3].name).to.eq(boards[3].name);
        expect(res.body[0].starred).to.eq(false)
        expect(res.body[1].starred).to.eq(true)
        expect(res.body[2].starred).to.eq(false)
        expect(res.body[3].starred).to.eq(false)
      })
    });
    it("Stubb QA board and asserting data",()=>{
        cy.get(home.boardTitle).contains(boardQA.name).click()
        cy.get('@getBoardQA').its("response").then((res)=>{
        expect(res.body.name).to.eq(boardQA.name)
        expect(res.body.starred).to.eq(false)
        expect(res.body.lists[0].title).to.eq(boardQA.lists[0].title)
        expect(res.body.tasks[0].title).to.eq(boardQA.tasks[0].title)
        expect(res.body.tasks[1].title).to.eq(boardQA.tasks[1].title)
        expect(res.body.tasks[2].title).to.eq(boardQA.tasks[2].title)
        expect(res.body.tasks[0].listId).to.eq(res.body.lists[0].id)
        expect(res.body.tasks[1].listId).to.eq(res.body.lists[0].id)
        expect(res.body.tasks[2].listId).to.eq(res.body.lists[0].id)
        expect(res.statusCode).to.eq(200)
        
        })
    })
  });