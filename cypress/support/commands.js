// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('openPage', () => {
  cy.visit(Cypress.env("localUrl"))
})

Cypress.Commands.add('resetData', () => {
  cy.request('POST',  Cypress.env("localUrl") + '/api/testing/reset')
})

Cypress.Commands.add('addUser', ({name, username, password}) => {
  const user = {
    name: name,
    username: username,
    password: password
  }

  cy.request('POST', Cypress.env("localUrl") + '/api/users', user).then(() => {
    console.log('user added')
  })
})

Cypress.Commands.add('login', ({username, password}) => {
  const user = {
    username: username,
    password: password
  }

  cy.request('POST', Cypress.env("localUrl") + '/api/login', user)
  .then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    //cy.visit(Cypress.env("localUrl"))
  })
})

Cypress.Commands.add('addBlog', ({title, author, url}) => {
  const blog = {
    title: title,
    author: author,
    url: url
  }

  const storedToken = JSON.parse(localStorage.getItem('loggedBlogAppUser'))
  //console.log('stored: ', storedToken)
  cy.request({
    method: 'POST', 
    url: Cypress.env("localUrl") + '/api/blogs', 
    headers: { Authorization: `bearer ${storedToken["token"]}` },
    body: blog
  }).then(({body}) => {
    console.log('ID: ' + body.id)
    return body
  })  
})

Cypress.Commands.add('modifyBlog', (blog) => {
  const storedToken = JSON.parse(localStorage.getItem('loggedBlogAppUser'))
  cy.log('Blog' + JSON.stringify(blog))
  cy.request({
    method: 'PUT', 
    url: `${Cypress.env("localUrl")}/api/testing/blogmodify/${blog.id}`, 
    headers: { Authorization: `bearer ${storedToken["token"]}` },
    body: blog
  })
})