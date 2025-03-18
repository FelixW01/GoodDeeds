describe('ProfilePage Tests', () => {
    const user = {
        email: Cypress.env('userEmail'), // Use environment variable for user email
        password: Cypress.env('userPass'), // Use environment variable for user password
        first_name: Cypress.env('userFname'), // Use environment variable for user first name
        last_name: Cypress.env('userLname'), // Use environment variable for user last name
    };

    const organizationUser = {
        email: Cypress.env('orgEmail'), // Use environment variable for organization email
        password: Cypress.env('orgPass'), // Use environment variable for organization password
    };

    beforeEach(() => {
        // Visit the login page before each test
        cy.visit('/login'); // Use baseUrl from Cypress config
    });

    it('Displays the correct profile information for a user (volunteer)', () => {
        // Log in as a user (volunteer)
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="password"]').type(user.password);
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click();

        // Verify the dashboard content for a user (volunteer)
        cy.url().should('include', '/dashboard');

        // Navigate to the profile page
        cy.visit('/profile'); // Use baseUrl from Cypress config

        // Verify the profile information
        cy.contains('Profile').should('exist'); // Profile header
        cy.contains(user.first_name).should('exist'); // First name
        cy.contains(user.last_name).should('exist'); // Last name
        cy.contains(user.email).should('exist'); // Email
        cy.contains('Your Impact').should('exist'); // Impact section
        cy.contains('Hours Volunteered').should('exist'); // Hours volunteered
        cy.contains('Events Joined').should('exist'); // Events joined
    });

    it('Displays the correct profile information for an organization user', () => {
        // Log in as an organization
        cy.get('input[name="email"]').type(organizationUser.email);
        cy.get('input[name="password"]').type(organizationUser.password);
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click();

        // Verify the dashboard content for an organization
        cy.url().should('include', '/dashboard');

        // Navigate to the profile page
        cy.visit('/profile'); // Use baseUrl from Cypress config

        // Verify the profile information
        cy.contains('Profile').should('exist'); // Profile header
        cy.contains(organizationUser.email).should('exist'); // Email
        cy.contains('Your Impact').should('exist'); // Impact section
        cy.contains('Events Hosted').should('exist'); // Events hosted
    });

    it('Allows a user to edit their profile', () => {
        // Log in as a user (volunteer)
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="password"]').type(user.password);
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click();

        // Verify the dashboard content for a user (volunteer)
        cy.url().should('include', '/dashboard');

        // Navigate to the profile page
        cy.visit('/profile'); // Use baseUrl from Cypress config

        // Enter edit mode
        cy.contains('Edit Profile').click();

        // Update the first name and last name
        const newFirstName = 'Jane';
        const newLastName = 'Smith';
        cy.get('input[name="first_name"]').clear().type(newFirstName);
        cy.get('input[name="last_name"]').clear().type(newLastName);

        // Save changes
        cy.contains('Save Changes').click();

        // Verify the updated profile information
        cy.contains(newFirstName).should('exist'); // Updated first name
        cy.contains(newLastName).should('exist'); // Updated last name
        cy.contains('Profile updated successfully!').should('exist'); // Success toast
    });
});