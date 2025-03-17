describe('Create Event', () => {
    const organizationUser = {
        email: 'org@example.com', // Predefined organization email
        password: 'securepassword123', // Predefined organization password
    };

    const eventData = {
        title: 'Test Event',
        description: 'Help clean up the local park.',
        street: '123 Main St',
        city: 'Charlotte',
        state: 'NC',
        zip: '28202',
        start_date: '2023-12-01',
        end_date: '2023-12-01',
        start_time: '09:00',
        end_time: '12:00',
        requirements: 'Must be 18+ years old.',
    };

    beforeEach(() => {
        // Log in as an organization before each test
        cy.visit('http://localhost:5173/login');
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
        cy.visit('http://localhost:5173/dashboard');
        cy.contains('Create Event').click();

        // Fill out the event creation form
        cy.get('input[name="title"]').type(eventData.title);
        cy.get('input[name="description"]').type(eventData.description);
        cy.get('input[name="street"]').type(eventData.street);
        cy.get('input[name="city"]').type(eventData.city);
        cy.get('select[name="state"]').select(eventData.state);
        cy.get('input[name="zip"]').type(eventData.zip);
        cy.get('input[name="start_date"]').type(eventData.start_date);
        cy.get('input[name="end_date"]').type(eventData.end_date);
        cy.get('input[name="start_time"]').type(eventData.start_time);
        cy.get('input[name="end_time"]').type(eventData.end_time);
        cy.get('input[name="requirements"]').type(eventData.requirements);

        // Submit the form
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Sign Up').click();

        // Wait for the event creation API call to complete
        cy.wait('@createEvent');

        // Verify the success toast
        cy.contains('Event created successfully!').should('exist');
    });
});