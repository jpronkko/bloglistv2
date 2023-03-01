describe('Blog app', function () {
  const testUser = 'mare'
  const testPassword = 'passu'
  const testUserName ='Mikko Nerg'
  const testUser2 = 'mare2'
 
  const blogs = [
    { title:'Kaarlo kuusikossa', author: 'Jules Verne', url: 'http://centerofearth.com' },
    { title: 'Simo Surakka kaivaa ojaa', author: 'Martin Tscherkoviz', url: 'https://abd.org' },
    { title: 'Minmax-algorithm', author: 'Neo Burns', url: 'https://foffa.com' }
  ]

  beforeEach(function () {
    cy.resetData()
    cy.addUser({username: testUser, name: testUserName, password: testPassword}) 
    cy.openPage()    
  })

  it('front page can be openend', function () {
    cy.contains('Blog App')
  })

  it('succeeds with correct credentials', function () {
    cy.get('#username').type(testUser)
    cy.get('#password').type(testPassword)
    cy.get('#login-button').click()
    cy.contains(`${testUserName} has logged in.`)
  })

  it('fails with incorrect credentials', function () {
    cy.get('#username').type(testUser)
    cy.get('#password').type('silakka')
    cy.get('#login-button').click()
    cy.get('#notification')
      .should('contain', 'Wrong username or password')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.resetData()
      cy.addUser({username: testUser, name: testUserName, password: testPassword}) 
      cy.login({username: testUser, password: testPassword})
    })


    it('A blog can be created', function () {
      const blog = blogs[0]

      cy.openPage()
      cy.contains('All blogs loaded!').should('be.visible')
      cy.get('#show_toggle').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#submit_blog').click()
      //createBlogEntry()

      cy.get('#blog-list').contains(blogs[0].title) 
    })

    it('A blog can be liked', function () {
      const blog = blogs[0]
      
      cy.addBlog(blog)
      cy.openPage()
      cy.contains(blog.title).parent().as('theblog')  
      cy.get('@theblog').get('.blog-link').click()
      
      cy.contains(blog.title).parent().as('themaxblog')
      cy.get('@themaxblog').parent().get('#likesButton').click()
      cy.get('@themaxblog').get('#blog_likes').contains('1')
    })

    it('A blog owner can delete her/his blog', function () {
      const blog = blogs[1]
      
      cy.addBlog(blog)
      cy.openPage()    

      cy.contains(blog.title).get('.blog-link').click()
      cy.contains(blog.title).parent().as('themaxblog')
      
      cy.get('@themaxblog').get('#deleteButton').click()
      cy.get('#blog-list').should('not.contain', blog.title)
    })

    it('A blog non-owner can not delete a blog', function () {
      const blog = blogs[1]
     
      cy.addBlog(blog)
    
      cy.addUser({username: testUser2, name: testUserName, password: testPassword}) 
      cy.login({username: testUser2, password: testPassword})

      cy.openPage()    

      cy.contains(blog.title).get('.blog-link').click()
      cy.contains(blog.title).parent().as('themaxblog')
      
      cy.get('@themaxblog').should('not.contain', '#deleteButton')
    })

    it('blogs ordered by likes', function () {
      const likes = [5, 2, 3]
      const likesSorted = likes.sort().reverse()

      likes.forEach((x, index) =>  {
        cy.addBlog(blogs[index]).then((blog) => {
          //console.log('body: ', blog)
          cy.modifyBlog({...blog, likes: x})
        })  
      })
     
      cy.openPage()    
      cy.contains('All blogs loaded!').should('be.visible')

      cy.get('#blog-list').as('blist')
      
      cy.get('@blist').get('.blog-link').each((el, index, list) => {
        const url = el.prop('href')
        cy.log("URl:" + url)
        cy.visit(url)
        cy.get('#blog_likes').contains(likesSorted[index])
        //cy.go('back')
      })
      
    /*  cy.get('@blist').get('.blog-link').each(($el, index, $list) => {
        cy.log($el)
        cy.wrap($el).click()
        cy.get('#blog_likes').contains(likesSorted[index])
        //cy.get('#home_button').click()
      })
*/
     /* cy.get('#blog-list').get('a').each((page, index) => {
        cy.log(page)
        cy.wrap(page).click()
        cy.get('#blog_likes').contains(likesSorted[index])*/
        /*cy.request(page.prop('href')).then(() => {
          cy.log('prop' + page.prop('href'))
          cy.get('#blog_likes').contains(likesSorted[index])
        })*/
      //})
      //cy.get('#blog-list').get('.likesLine').each(($el, index, $list) => {
      //  cy.contains(likesSorted[index])
      //})
    })
  })  
})
