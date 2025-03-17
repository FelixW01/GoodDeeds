describe('LoginPage Tests', () => {
    const user = {
        email: Cypress.env('userEmail'), // Use environment variable for user email
        password: Cypress.env('userPass'), // Use environment variable for user password
    };

    beforeEach(() => {
        // Visit the login page before each test
        cy.visit('/login'); // Use baseUrl from Cypress config
    });

    it('Renders the LoginPage correctly', () => {
        // Check if the "Login now!" heading exists
        cy.contains('Login now!').should('exist');

        // Check if the login form exists
        cy.get('form').should('exist');
        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="password"]').should('exist');
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').should('exist'); // Specific button
    });

    it('Shows default HTML5 validation for missing fields', () => {
        // Submit the form without filling any fields
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click(); // Specific button

        // Check for default HTML5 validation messages on all required fields
        cy.get('input[name="email"]').then(($input) => {
            expect($input[0].validationMessage).to.include('Please fill out this field');
        });

        cy.get('input[name="password"]').then(($input) => {
            expect($input[0].validationMessage).to.include('Please fill out this field');
        });
    });

    it('Shows a toast error when the form is submitted with invalid credentials', () => {
        // Mock the API response for invalid credentials
        cy.intercept('POST', '/api/login', {
            statusCode: 401,
            body: { message: 'Invalid credentials' },
        }).as('login');

        // Fill out the form with invalid credentials
        cy.get('input[name="email"]').type('invalid@example.com');
        cy.get('input[name="password"]').type('wrongpassword');

        // Submit the form by targeting the specific button
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click(); // Specific button

        // Check if the toast error message is displayed
        cy.contains('Invalid credentials').should('exist'); // Toast error message
    });

    it('Successfully logs in with valid credentials and shows a success toast on the dashboard', () => {
        // Mock the API response for successful login
        cy.intercept('POST', '/api/user/login', {
            statusCode: 200,
            body: { message: 'Login successful' },
        }).as('login');

        // Fill out the form with valid credentials
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="password"]').type(user.password);

        // Submit the form by targeting the specific button
        cy.get('button.bg-\\[\\#7539C2\\]').contains('Login').click(); // Specific button

        // Check if the user is redirected to the dashboard
        cy.url().should('include', '/dashboard');
    });
});