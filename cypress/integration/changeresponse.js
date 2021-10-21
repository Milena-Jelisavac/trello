
describe("Network stabbing", () => {
  it("Changing network response", () => {
    cy.intercept("/api/boards", { fixture: "board.json" }).as("stubbedBoards");
    cy.visit("/");
  });

  it("Dynamically change parts of network response", () => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/boards",
      },
      (req) => {
        req.reply((res) => {
          res.body[0].starred = true;
          res.body[1].name = "Ovo je potpuno novi board";
          return res;
        });
      }
    );
    cy.visit("/");
  });
  it("Asertovanje", () => {
    cy.intercept("/api/boards", { fixture: "board.json" }).as("stubbedBoards");
    cy.visit("/");
    cy.get("@stubbedBoards")
      .its("response")
      .then((res) => {
        expect(res.body[0].name).to.eq("Novi drugi board");
        expect(res.statusCode).to.eq(200);
      });
  });

  it("Create board dynamically", () => {
    cy.intercept("/api/boards", [
      {
        name: "Create board with intercept",
      },
    ]);

    cy.visit("");
  });
});
