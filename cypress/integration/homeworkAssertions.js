describe("Stubbing response and asserting data for all boards an for QA board", () => {
   beforeEach("",()=>{
    cy.intercept("http://localhost:3000/api/boards/63391079216", { fixture: "boardQA.json" }).as("stubbedQA");
   })
    it("Stubbing response and aserting data for all boards", () => {
      cy.intercept("/api/boards", { fixture: "fourBoards.json" }).as("stubbedBoards");
      cy.visit("/");
      cy.wait('@stubbedBoards').its("response").then((res)=>{
        expect(res.body[0].name).to.eq("To do");
        expect(res.body[1].name).to.eq(" In progress");
        expect(res.body[2].name).to.eq("In QA");
        expect(res.body[3].name).to.eq("Done");
        expect(res.body[0].starred).to.eq(false)
        expect(res.body[1].starred).to.eq(true)
        expect(res.body[2].starred).to.eq(false)
        expect(res.body[3].starred).to.eq(false)
      })
    });
    it("Stubb QA board",()=>{
        cy.get('h1').contains("In QA").click()
        cy.get('@stubbedQA').its("response").then((res)=>{
        expect(res.body.name).to.eq("In QA")
        expect(res.body.starred).to.eq(false)
        expect(res.body.lists[0].title).contains("NovaLista")
        expect(res.body.tasks[0].title).contains("Stubbing network responses")
        expect(res.body.tasks[1].title).contains("Changing parts of response data")
        expect(res.body.tasks[2].title).contains("Intercepting")
        expect(res.body.tasks[0].listId).to.eq(res.body.lists[0].id)
        expect(res.body.tasks[1].listId).to.eq(res.body.lists[0].id)
        expect(res.body.tasks[2].listId).to.eq(res.body.lists[0].id)
        expect(res.statusCode).to.eq(200)
        
        })
    })
  });