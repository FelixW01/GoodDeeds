describe('SignUpOrgCard Tests', () => {
    beforeEach(() => {
        // Visit the organization signup page before each test
        cy.visit('http://localhost:5173/signuporg');
    });

    it('Renders the SignUpOrgCard correctly', () => {
        // Check if the "Register your organization today!" heading exists
        cy.contains('Register your organization today!').should('exist');

        // Check if the signup form exists
        cy.get('form').should('exist');
        cy.get('input[name="first_name"]').should('exist');
        cy.get('input[name="last_name"]').should('exist');
        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="password"]').should('exist');
        cy.get('input[name="name"]').should('exist');
        cy.get('input[name="contact_email"]').should('exist');
        cy.get('button').contains('Sign Up').should('exist');
    });

    it('Shows default HTML5 validation for invalid email fields', () => {
        // Fill out the form with invalid emails
        cy.get('input[name="first_name"]').type('John');
        cy.get('input[name="last_name"]').type('Doe');
        cy.get('input[name="email"]').type('invalid-email');
        cy.get('input[name="password"]').type('Password123');
        cy.get('input[name="name"]').type('Good Deeds Org');
        cy.get('input[name="contact_email"]').type('invalid-contact-email');

        // Submit the form by targeting the specific button
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Sign Up').click();

        // Check for default HTML5 validation messages on email fields
        cy.get('input[name="email"]').then(($input) => {
            expect($input[0].validationMessage).to.include('Please include an \'@\' in the email address');
        });

        cy.get('input[name="contact_email"]').then(($input) => {
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

        cy.get('input[name="name"]').then(($input) => {
            expect($input[0].validationMessage).to.include('Please fill out this field');
        });

        cy.get('input[name="contact_email"]').then(($input) => {
            expect($input[0].validationMessage).to.include('Please fill out this field');
        });
    });

    it('Successfully submits the form with valid data and shows a success toast', () => {
        // Mock the API response for successful organization signup
        cy.intercept('POST', '/api/organizations/create', {
            statusCode: 200,
            body: { message: 'Organization account created successfully!' },
        }).as('signupOrg');

        // Fill out the form with valid data
        cy.get('input[name="first_name"]').type('John');
        cy.get('input[name="last_name"]').type('Doe');
        cy.get('input[name="email"]').type('john.doe@example.com');
        cy.get('input[name="password"]').type('Password123');
        cy.get('input[name="name"]').type('Good Deeds Org');
        cy.get('input[name="contact_email"]').type('contact@gooddeeds.org');

        // Submit the form by targeting the specific button
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Sign Up').click();

        // Wait for the toast to appear
        cy.contains('Account created successfully!').should('exist'); // Check toast message

        // Check if the user is redirected to the login page
        cy.url().should('include', '/login');
    });

    it('Displays an error message when the API request fails', () => {
        // Mock the API response for a failed organization signup
        cy.intercept('POST', '/api/organizations/create', {
            statusCode: 400,
            body: { message: 'Email already in use' },
        }).as('signupOrgFail');

        // Fill out the form with valid data
        cy.get('input[name="first_name"]').type('John');
        cy.get('input[name="last_name"]').type('Doe');
        cy.get('input[name="email"]').type('john.doe@example.com');
        cy.get('input[name="password"]').type('Password123');
        cy.get('input[name="name"]').type('Good Deeds Org');
        cy.get('input[name="contact_email"]').type('contact@gooddeeds.org');

        // Submit the form by targeting the specific button
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Sign Up').click();

        // Wait for the API call to complete
        cy.wait('@signupOrgFail');

        // Check if the error message is displayed
        cy.contains('Email already in use').should('exist');
    });
});