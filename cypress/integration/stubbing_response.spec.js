/// <reference types="cypress" />

// it("Stubbing response", () => {
//   cy.intercept("/api/boards", { fixture: "threeBoards.json" }).as(
//     "stubbedBoards"
//   );

//   cy.visit("/");
// });

// it("Dynamically change parts of the response data", () => {
//   cy.intercept(
//     {
//       method: "GET",
//       url: "/api/boards",
//     },
//     (req) => {
//       req.reply((res) => {
//         res.body[0].starred = true;
//         res.body[1].name = "Something else";

//         return res;
//       });
//     }
//   );

//   cy.visit("/");
// });
it.only("Create board with intercept", () => {
  cy.intercept(
    {
      method: "POST",
      url: "/api/boards",
    },
    (req) => {
      req.reply((res) => {
        res.body[0].starred = true;
        res.body[1].name = "Kreiranje novog boarda";

        return res;
      });
    }
  );

  cy.visit("/");
});
