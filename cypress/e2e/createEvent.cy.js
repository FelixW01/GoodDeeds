describe('Create Event', () => {
    const organizationUser = {
        email: Cypress.env('orgEmail'), // Fallback value
        password: Cypress.env('orgPass'), // Fallback value
    };

    beforeEach(() => {
        // Log in as an organization before each test
        cy.visit('/login'); // Use baseUrl from Cypress config
        cy.get('input[name="email"]').type(organizationUser.email);
        cy.get('input[name="password"]').type(organizationUser.password);
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click();

        // Verify the dashboard content for an organization
        cy.url().should('include', '/dashboard');
    });

    it('Creates an event successfully', () => {
        // Mock the API response for successful event creation
        cy.intercept('POST', '/api/events/create', {
            statusCode: 200,
            body: { message: 'Event created successfully!' },
        }).as('createEvent');

        // Navigate to the create event page
        cy.visit('/dashboard'); // Use baseUrl from Cypress config
        cy.contains('Create Event').click();

        // Fill out the event creation form
        cy.get('input[name="title"]').type('Test Event');
        cy.get('input[name="description"]').type('Help clean up the local park.');
        cy.get('input[name="street"]').type('123 Main St');
        cy.get('input[name="city"]').type('Charlotte');
        cy.get('select[name="state"]').select('NC');
        cy.get('input[name="zip"]').type('28202');
        cy.get('input[name="start_date"]').type('2023-12-01');
        cy.get('input[name="end_date"]').type('2023-12-01');
        cy.get('input[name="start_time"]').type('09:00');
        cy.get('input[name="end_time"]').type('12:00');
        cy.get('input[name="requirements"]').type('Must be 18+ years old.');

        // Submit the form
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Sign Up').click();

        // Wait for the event creation API call to complete
        cy.wait('@createEvent');

        // Verify the success toast
        cy.contains('Event created successfully!').should('exist');
    });
});