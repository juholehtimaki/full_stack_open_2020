describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Cyber user",
      username: "cyber",
      password: "12345",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login from is shown", () => {
    cy.contains("Login");
  });

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.get("#username").type("cyber");
      cy.get("#password").type("12345");
      cy.get("#login-button").click();
      cy.contains("Cyber user logged in");
    });

    it("fails with wrong credentials", () => {
      cy.get("#username").type("asd");
      cy.get("#password").type("asd");
      cy.get("#login-button").click();
      cy.contains("wrong username or password:D");
    });
  });
  describe("when logged in", () => {
    beforeEach(() => {
      cy.get("#username").type("cyber");
      cy.get("#password").type("12345");
      cy.get("#login-button").click();
    });
    it("a blog can be created", () => {
      cy.get("#new-blog").click();
      cy.get("#title").type("new blog");
      cy.get("#author").type("test");
      cy.get("#url").type("yet again:D");
      cy.get("#create-button").click();
      cy.contains("a new blog new blog added");
    });
    it("a blog can be liked", () => {
      cy.get("#new-blog").click();
      cy.get("#title").type("new blog");
      cy.get("#author").type("test");
      cy.get("#url").type("yet again:D");
      cy.get("#create-button").click();
      cy.contains("a new blog new blog added");
      cy.get("#view-button").click();
      cy.get("#like-button").click();
    });
    it("a blog can be removed by the user who made it", () => {
      cy.get("#new-blog").click();
      cy.get("#title").type("new blog");
      cy.get("#author").type("test");
      cy.get("#url").type("yet again:D");
      cy.get("#create-button").click();
      cy.contains("a new blog new blog added");
      cy.get("#view-button").click();
      cy.get("#delete-button").click();
    });
    it("blogs are sorted by the amount of likes", () => {
      //1st blog
      cy.get("#new-blog").click();
      cy.get("#title").type("1stblog");
      cy.get("#author").type("auhor");
      cy.get("#url").type("localhost:D");
      cy.get("#create-button").click();
      //2nd blog
      cy.get("#title").type("2ndblog");
      cy.get("#author").type("auhor");
      cy.get("#url").type("localhost:D");
      cy.get("#create-button").click();
      //like 2nd blog
      cy.get("#2ndblog").find("#view-button").click();
      cy.get("#2ndblog").find("#like-button").click();
      //refresh page
      cy.visit("http://localhost:3000");
      //check that the blogs have been sorted, e.g. 2ndblog is now the first one
      cy.get(".blog-container").first().contains("2ndblog");
    });
  });
});
