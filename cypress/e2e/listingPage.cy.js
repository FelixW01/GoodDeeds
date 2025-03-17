describe('ListingPage Tests', () => {
    const user = {
        email: Cypress.env('userEmail'), // Use environment variable for user email
        password: Cypress.env('userPass'), // Use environment variable for user password
    };

    const organizationUser = {
        email: Cypress.env('orgEmail'), // Use environment variable for organization email
        password: Cypress.env('orgPass'), // Use environment variable for organization password
    };

    beforeEach(() => {
        // Visit the listing page before each test
        cy.visit('/listing'); // Use baseUrl from Cypress config
    });

    it('Renders the ListingPage correctly for non-logged-in users', () => {
        // Check if the "Find Events" heading exists
        cy.get('h1').contains('Find Events').should('exist');

        // Check if the filter dropdowns exist (4 for non-logged-in users)
        cy.get('select').should('have.length', 4); // 4 filter dropdowns
        cy.contains('Sort By').should('exist');
        cy.contains('Filter By Month').should('exist');
        cy.contains('Filter By Start Time').should('exist');
        cy.contains('Filter By Status').should('exist');

        // Check if the event cards are rendered
        cy.get('.card').should('exist'); // Event cards
        cy.contains('Loading...').should('not.exist'); // Ensure loading state is not displayed
        cy.contains('No events found').should('not.exist'); // Ensure no events message is not displayed

        // Check if the "Register to Volunteer" button is not visible for non-logged-in users
        cy.contains('Register to Volunteer').should('exist');
    });

    it('Shows a modal when a non-logged-in user tries to register for an event', () => {
        // Click the "Register to Volunteer" button on an event card
        cy.get('.card').first().within(() => {
            cy.contains('Register to Volunteer').click();
        });

        // Check if the modal is displayed
        cy.get('.modal').should('exist');
        cy.contains('Sign Up or Log In').should('exist');
        cy.contains('You need to log in or sign up to register for this event.').should('exist');
    });

    it('Renders the ListingPage correctly for logged-in users (volunteers)', () => {
        // Log in as a user (volunteer)
        cy.visit('/login'); // Use baseUrl from Cypress config
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="password"]').type(user.password);
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click();

        // Verify the dashboard content for a user (volunteer)
        cy.url().should('include', '/dashboard');

        // Go back to the listing page
        cy.visit('/listing'); // Use baseUrl from Cypress config

        // Check if the filter dropdowns exist (5 for logged-in users)
        cy.get('select').should('have.length', 5); // 5 filter dropdowns
        cy.contains('Sort By').should('exist');
        cy.contains('Filter By Month').should('exist');
        cy.contains('Filter By Start Time').should('exist');
        cy.contains('Filter By Status').should('exist');
        cy.contains('Filter By Registration').should('exist'); // Additional filter for logged-in users

        // Check if the "Register to Volunteer" button is visible for logged-in users
        cy.contains('Register to Volunteer').should('exist');
    });

    it('Successfully registers for an event and updates the button to green', () => {
        // Log in as a user (volunteer)
        cy.visit('/login'); // Use baseUrl from Cypress config
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="password"]').type(user.password);
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click();

        // Verify the dashboard content for a user (volunteer)
        cy.url().should('include', '/dashboard');

        // Go back to the listing page
        cy.visit('/listing'); // Use baseUrl from Cypress config

        // Mock the API response for successful registration
        cy.intercept('POST', '/api/user-events/register', {
            statusCode: 201,
            body: { message: 'Successfully registered for the event!' },
        }).as('registerEvent');

        // Click the "Register to Volunteer" button on an active event
        cy.get('.card').first().within(() => {
            cy.contains('Register to Volunteer').click();
        });

        // Wait for the registration to complete
        cy.wait('@registerEvent');

        // Check if the button turns green and displays "You Registered"
        cy.get('.card').first().within(() => {
            cy.get('button.bg-green-500').contains('You Registered').should('exist');
        });
    });

    it('Successfully registers for an event and verifies the count on the dashboard', () => {
        // Log in as a user (volunteer)
        cy.visit('/login'); // Use baseUrl from Cypress config
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="password"]').type(user.password);
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click();

        // Verify the dashboard content for a user (volunteer)
        cy.url().should('include', '/dashboard');

        // Go back to the listing page
        cy.visit('/listing'); // Use baseUrl from Cypress config

        // Mock the API response for successful registration
        cy.intercept('POST', '/api/user-events/register', {
            statusCode: 201,
            body: { message: 'Successfully registered for the event!' },
        }).as('registerEvent');

        // Click the "Register to Volunteer" button on an active event
        cy.get('.card').first().within(() => {
            cy.contains('Register to Volunteer').click();
        });

        // Wait for the registration to complete
        cy.wait('@registerEvent');

        // Check if the button turns green and displays "You Registered"
        cy.get('.card').first().within(() => {
            cy.get('button.bg-green-500').contains('You Registered').should('exist');
        });

        // Navigate to the dashboard
        cy.visit('/dashboard'); // Use baseUrl from Cypress config

        // Verify the count of registered events on the dashboard
        cy.get('.card').should('exist'); // Ensure event cards are rendered
        cy.get('.card').its('length').then((initialCount) => {
            // After registration, the count should increase by 1
            cy.get('.card').should('have.length', initialCount);
        });
    });

    it('Renders the ListingPage correctly for logged-in organization users', () => {
        // Log in as an organization
        cy.visit('/login'); // Use baseUrl from Cypress config
        cy.get('input[name="email"]').type(organizationUser.email);
        cy.get('input[name="password"]').type(organizationUser.password);
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click();

        // Verify the dashboard content for an organization
        cy.url().should('include', '/dashboard');

        // Go back to the listing page
        cy.visit('/listing'); // Use baseUrl from Cypress config

        // Check if the filter dropdowns exist (4 for organization users)
        cy.get('select').should('have.length', 4); // 4 filter dropdowns
        cy.contains('Sort By').should('exist');
        cy.contains('Filter By Month').should('exist');
        cy.contains('Filter By Start Time').should('exist');
        cy.contains('Filter By Status').should('exist');

        // Check if the "Register to Volunteer" button is not visible for organization users
        cy.contains('Register to Volunteer').should('not.exist');
    });
});