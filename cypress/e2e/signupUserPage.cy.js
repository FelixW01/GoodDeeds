describe('SignUpPage Tests', () => {
    beforeEach(() => {
        // Visit the signup page before each test
        cy.visit('/signup');
    });

    it('Renders the SignUpPage correctly', () => {
        // Check if the "Become a member today!" heading exists
        cy.contains('Become a member today!').should('exist');

        // Check if the signup form exists
        cy.get('form').should('exist');
        cy.get('input[name="first_name"]').should('exist');
        cy.get('input[name="last_name"]').should('exist');
        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="password"]').should('exist');
        cy.get('button').contains('Sign Up').should('exist');
    });

    it('Shows default HTML5 validation for invalid email', () => {
        // Fill out the form with an invalid email
        cy.get('input[name="first_name"]').type('John');
        cy.get('input[name="last_name"]').type('Doe');
        cy.get('input[name="email"]').type('invalid-email');
        cy.get('input[name="password"]').type('Password123');

        // Submit the form by targeting the specific button
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Sign Up').click();

        // Check for default HTML5 validation message on the email input
        cy.get('input[name="email"]').then(($input) => {
            expect($input[0].validationMessage).to.include('Please include an \'@\' in the email address');
        });
    });

    it('Shows default HTML5 validation for missing fields', () => {
        // Submit the form without filling any fields
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Sign Up').click();

        // Check for default HTML5 validation messages on all required fields
        cy.get('input[name="first_name"]').then(($input) => {
            expect($input[0].validationMessage).to.include('Please fill out this field');
        });

        cy.get('input[name="last_name"]').then(($input) => {
            expect($input[0].validationMessage).to.include('Please fill out this field');
        });

        cy.get('input[name="email"]').then(($input) => {
            expect($input[0].validationMessage).to.include('Please fill out this field');
        });

        cy.get('input[name="password"]').then(($input) => {
            expect($input[0].validationMessage).to.include('Please fill out this field');
        });
    });

    it('Successfully submits the form with valid data and shows a success toast', () => {
        // Mock the API response for successful signup
        cy.intercept('POST', '/api/user/create', {
            statusCode: 200,
            body: { message: 'Account created successfully!' },
        }).as('signup');

        // Fill out the form with valid data
        cy.get('input[name="first_name"]').type('John');
        cy.get('input[name="last_name"]').type('Doe');
        cy.get('input[name="email"]').type('john.doe@example.com');
        cy.get('input[name="password"]').type('Password123');

        // Submit the form by targeting the specific button
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Sign Up').click();

        // Wait for the toast to appear
        cy.contains('Account created successfully!').should('exist'); // Check toast message

        // Check if the user is redirected to the login page
        cy.url().should('include', '/login');
    });
});