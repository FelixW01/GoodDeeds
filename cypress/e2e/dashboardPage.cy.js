describe('DashboardPage Tests', () => {
    const user = {
        email: 'johnd@gmail.com', // Predefined user email
        password: 'password1234', // Predefined user password
        first_name: 'John',
        last_name: 'Doe',
    };

    const organizationUser = {
        email: 'org@example.com', // Predefined organization email
        password: 'securepassword123', // Predefined organization password
    };

    it('Displays the correct dashboard for a user (volunteer)', () => {
        // Log in as a user (volunteer)
        cy.visit('http://localhost:5173/login');
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="password"]').type(user.password);
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click();

        // Verify the dashboard content for a user (volunteer)
        cy.url().should('include', '/dashboard');
        cy.contains(`Welcome, ${user.first_name} ${user.last_name}`).should('exist'); // Welcome message
        cy.contains('Statistics').should('exist'); // Statistics tab
        cy.contains('Create Event').should('not.exist'); // Create Event tab should not exist for users (volunteers)
    });

    it('Displays the correct dashboard for an organization user', () => {
        // Log in as an organization
        cy.visit('http://localhost:5173/login');
        cy.get('input[name="email"]').type(organizationUser.email);
        cy.get('input[name="password"]').type(organizationUser.password);
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click();

        // Verify the dashboard content for an organization
        cy.url().should('include', '/dashboard');
        cy.contains('Statistics').should('exist'); // Statistics tab
        cy.contains('Create Event').should('exist'); // Create Event tab should exist for organizations
    });
});