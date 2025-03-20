describe('Navbar Tests', () => {
    const user = {
        email: Cypress.env('userEmail'), // Use environment variable for user email
        password: Cypress.env('userPass'), // Use environment variable for user password
    };

    const organizationUser = {
        email: Cypress.env('orgEmail'), // Use environment variable for organization email
        password: Cypress.env('orgPass'), // Use environment variable for organization password
    };

    beforeEach(() => {
        // Visit the home page before each test
        cy.visit('/'); // Use baseUrl from Cypress config
    });

    it('Renders the Navbar correctly for non-logged-in users', () => {
        // Check if the "GoodDeeds" logo exists
        cy.contains('GoodDeeds').should('exist');

        // Check if the "Events" link exists
        cy.contains('Events').should('exist');

        // Check if the "For Organizations" and "For Volunteers" links exist
        cy.contains('For Organizations').should('exist');
        cy.contains('For Volunteers').should('exist');

        // Check if the "Login" and "Sign Up" buttons exist
        cy.contains('Login').should('exist');
        cy.contains('Sign Up').should('exist');

        // Check if the user avatar dropdown does not exist
        cy.get('.fa-user').should('not.exist');
    });

    it('Renders the Navbar correctly for logged-in users (volunteers)', () => {
        // Log in as a user (volunteer)
        cy.visit('/login'); // Use baseUrl from Cypress config
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="password"]').type(user.password);
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click();

        // Verify the dashboard content for a user (volunteer)
        cy.url().should('include', '/dashboard');

        // Set viewport to desktop size
        cy.viewport(1280, 720); // Desktop size

        // Check if the "GoodDeeds" logo exists
        cy.contains('GoodDeeds').should('exist');

        // Check if the "Events" link exists
        cy.contains('Events').should('exist');

        // Check if the "Dashboard" link exists
        cy.contains('Dashboard').should('exist');

        // Check if the "For Organizations" and "For Volunteers" links do not exist
        cy.contains('For Organizations').should('not.exist');
        cy.contains('For Volunteers').should('not.exist');

        // Check if the user avatar dropdown exists (desktop view)
        cy.get('.fa-user').should('exist');

        // Check if the "Logout" option exists in the dropdown (desktop view)
        cy.get('.fa-user').click({force: true});
        cy.contains('Logout').should('exist');
    });

    it('Renders the Navbar correctly for logged-in organization users', () => {
        // Log in as an organization
        cy.visit('/login'); // Use baseUrl from Cypress config
        cy.get('input[name="email"]').type(organizationUser.email);
        cy.get('input[name="password"]').type(organizationUser.password);
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click();

        // Verify the dashboard content for an organization
        cy.url().should('include', '/dashboard');

        // Set viewport to desktop size
        cy.viewport(1280, 720); // Desktop size

        // Check if the "GoodDeeds" logo exists
        cy.contains('GoodDeeds').should('exist');

        // Check if the "Events" link exists
        cy.contains('Events').should('exist');

        // Check if the "Dashboard" link exists
        cy.contains('Dashboard').should('exist');

        // Check if the "For Organizations" and "For Volunteers" links do not exist
        cy.contains('For Organizations').should('not.exist');
        cy.contains('For Volunteers').should('not.exist');

        // Check if the user avatar dropdown exists (desktop view)
        cy.get('.fa-user').should('exist');

        // Check if the "Logout" option exists in the dropdown (desktop view)
        cy.get('.fa-user').click({force: true});
        cy.contains('Logout').should('exist');
    });

    it('Logs out successfully and updates the Navbar', () => {
        // Log in as a user (volunteer)
        cy.visit('/login'); // Use baseUrl from Cypress config
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="password"]').type(user.password);
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click();

        // Verify the dashboard content for a user (volunteer)
        cy.url().should('include', '/dashboard');

        // Open the user avatar dropdown (desktop view) with force: true
        cy.get('.fa-user').click({ force: true });

        // Click the "Logout" link with force: true
        cy.contains('Logout').click({ force: true });

        // Verify the success toast
        cy.contains('Successfully logged out.').should('exist');

        // Check if the "GoodDeeds" logo exists
        cy.contains('GoodDeeds').should('exist');

        // Check if the "Events" link exists
        cy.contains('Events').should('exist');

        // Check if the "For Organizations" and "For Volunteers" links exist
        cy.contains('For Organizations').should('exist');
        cy.contains('For Volunteers').should('exist');

        // Check if the "Login" and "Sign Up" buttons exist
        cy.contains('Login').should('exist');
        cy.contains('Sign Up').should('exist');

        // Check if the user avatar dropdown does not exist
        cy.get('.fa-user').should('not.exist');
    });
});