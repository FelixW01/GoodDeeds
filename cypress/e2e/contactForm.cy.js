describe('ContactForm Tests', () => {
    beforeEach(() => {
        // Visit the page where the ContactForm is rendered
        cy.visit('/');
    });

    it('Renders the ContactForm component', () => {
        // Check if the form and its elements are rendered
        cy.get('form').should('exist'); // Check if the form exists
        cy.get('input[placeholder="Name"]').should('exist'); // Name input
        cy.get('input[placeholder="email@example.com"]').should('exist'); // Email input
        cy.get('textarea[placeholder="Message"]').should('exist'); // Message textarea
        cy.get('button').contains('Send Message').should('exist'); // Submit button
    });

    it('Shows an error alert when the form is submitted with empty fields', () => {
        // Submit the form without filling any fields
        cy.get('button').contains('Send Message').click();

        // Check if the error alert is displayed
        cy.get('.alert-error').should('exist').contains('Please fill out all fields');
        cy.get('.alert-success').should('not.exist');
    });

    it('Submits the form successfully and resets the fields', () => {
        // Fill out the form
        cy.get('input[placeholder="Name"]').type('John Doe');
        cy.get('input[placeholder="email@example.com"]').type('john.doe@example.com');
        cy.get('textarea[placeholder="Message"]').type('This is a test message.');

        // Submit the form
        cy.get('button').contains('Send Message').click();

        // Check if the form fields are reset after submission
        cy.get('input[placeholder="Name"]').should('have.value', ''); // Name field is reset
        cy.get('input[placeholder="email@example.com"]').should('have.value', ''); // Email field is reset
        cy.get('textarea[placeholder="Message"]').should('have.value', ''); // Message field is reset

        // Check if the error alert is not displayed
        cy.get('.alert-error').should('not.exist');
        cy.get('.alert-success').should('exist').contains('Form submitted successfully!');
    });
});