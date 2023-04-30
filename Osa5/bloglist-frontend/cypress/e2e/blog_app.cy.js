describe('Blog App', () => {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const user = {
            name: 'Post Testi',
            username: 'mluukkai',
            password: 'salainen'
        };
        cy.request('POST', 'http://localhost:3003/api/users', user);

        const userTwo = {
            name: 'Post Testi 2',
            username: 'hellas',
            password: 'salainen'
        };
        cy.request('POST', 'http://localhost:3003/api/users', userTwo);

        cy.visit('http://localhost:3000/');
    });

    it('Login form is shown', () => {
        cy.contains('Log In To Application');
        cy.contains('Login');

        cy.get('#username').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('#login-button').should('be.visible');
    });

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('mluukkai');
            cy.get('#password').type('salainen');
            cy.get('#login-button').click();

            cy.contains('Post Testi logged in');
        });

        it('fails with wrong credentials', function() { 
            cy.get('#username').type('1');
            cy.get('#password').type('1');
            cy.get('#login-button').click();

            cy.contains('Wrong username or password');
        });
    });

    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('mluukkai');
            cy.get('#password').type('salainen');
            cy.get('#login-button').click();

            cy.login({ username: 'mluukkai', password: 'salainen' });
            cy.createBlog({ title: 'Cypress Testi', author: 'Cypress Tester', url:'Cypress:Open' });
            
            cy.get('#logout').click();
            cy.get('#username').type('hellas');
            cy.get('#password').type('salainen');
            cy.get('#login-button').click();

            cy.login({ username: 'hellas', password: 'salainen' });
            cy.createBlog({ title: 'hassel Blogi', author: 'hellas', url:'Cypress:Open' });
        });

        it('A blog can be created', function() {
            cy.contains('Cypress Testi');
        });

        it('Blog can be liked', function() {
            cy.get('#view-button').click();
            cy.get('#like-button').click();
            cy.contains('1');
        });

        it('Blog can be deleted by right user and delete button is only visible to the creator', function() {
            cy.contains('Cypress Testi').find('button').should('contain', 'View').click();
            cy.contains('Cypress Testi').parent().find('button').should('not.contain', 'Remove');

            cy.contains('hassel Blogi').find('button').should('contain', 'View').click();
            cy.contains('hassel Blogi').parent().find('button').should('contain', 'Remove');
            cy.get('#delete-button').click();
            cy.get('html').should('not.contain', 'hassel Blogi');
        });
    });

    describe('Blog is sorted by amount of likes', function() {
        beforeEach(function() {
            cy.get('#username').type('mluukkai');
            cy.get('#password').type('salainen');
            cy.get('#login-button').click();
            cy.login({ username: 'mluukkai', password: 'salainen' });

            cy.createBlog({ title: 'Cypress Testi', author: 'Cypress Tester', url:'Cypress:Open' });
            cy.createBlog({ title: 'hassel Blogi', author: 'hellas', url:'Cypress:Open' });

            cy.contains('Cypress Testi').as('cypressBlog');
            cy.contains('hassel Blogi').as('hasselBlog');
        });

        it('Sort Blogs', function() {
            cy.get('@cypressBlog').contains('View').click();  
            cy.get('@hasselBlog').contains('View').click();
            
            cy.get('@cypressBlog').contains('Like').as('likeCypress');
            cy.get('@hasselBlog').contains('Like').as('likeHassel');  
           
            cy.get('@likeHassel').click();  
            cy.get('@likeHassel').click(); 
            cy.get('@likeCypress').click();

            cy.get('div').then(blog => {
                cy.wrap(blog[0]).contains('2');
                cy.wrap(blog[1]).contains('1');
            });
        });
    });
});