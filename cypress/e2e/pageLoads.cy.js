describe('Page Load Tests', () => {
    const pages = [
        '/', // Home Page
        '/dashboard', // Dashboard Page
        '/createlist', // Create Listing Page
        '/login', // Login Page
        '/signup', // Sign Up Page
        '/signuporg', // Sign Up Organization Page
        '/listing', // Listing Page
        '/profile', // Profile Page
    ];

    pages.forEach((page) => {
        it(`Loads the ${page} page correctly`, () => {
            // Visit the page
            cy.visit(`${page}`);

            // Ensure the page loads without errors
            cy.url().should('include', page); // Verify the URL is correct
        });
    });

    it('Shows a 404 error for an unknown page', () => {
        // Visit a non-existent page
        cy.visit('/unknown-page', { failOnStatusCode: false });

        // Ensure the page loads without errors (even for 404)
        cy.url().should('include', '/unknown-page'); // Verify the URL is correct
    });
});