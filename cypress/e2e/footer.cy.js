describe('Footer Tests', () => {
    beforeEach(() => {
        // Visit the home page before each test
        cy.visit('http://localhost:5173/');
    });

    it('Renders the Footer correctly', () => {
        // Check if the footer exists
        cy.get('footer').should('exist');

        // Check if the "About us" link exists and navigates to the correct route
        cy.contains('About us').should('exist');
        cy.get('footer a[href="/"]').contains('About us').click();
        cy.url().should('include', '/');

        // Check if the "Contact" link exists and navigates to the correct route
        cy.contains('Contact').should('exist');
        cy.get('footer a[href="/"]').contains('Contact').click();
        cy.url().should('include', '/');

        // Check if the "Events" link exists and navigates to the correct route
        cy.contains('Events').should('exist');
        cy.get('footer a[href="/listing"]').contains('Events').click();
        cy.url().should('include', '/listing');

        // Check if the "FAQ" link exists and navigates to the correct route
        cy.contains('FAQ').should('exist');
        cy.get('footer a[href="/"]').contains('FAQ').click();
        cy.url().should('include', '/');

        // Check if the Twitter icon exists
        cy.get('footer svg[width="24"][height="24"]')
            .first()
            .should('exist')
            .and('have.attr', 'viewBox', '0 0 24 24');

        // Check if the YouTube icon exists
        cy.get('footer svg[width="24"][height="24"]')
            .eq(1)
            .should('exist')
            .and('have.attr', 'viewBox', '0 0 24 24');

        // Check if the Facebook icon exists
        cy.get('footer svg[width="24"][height="24"]')
            .eq(2)
            .should('exist')
            .and('have.attr', 'viewBox', '0 0 24 24');

        // Check if the copyright text exists and includes the current year
        const currentYear = new Date().getFullYear();
        cy.contains(`Copyright © ${currentYear} - All right reserved by GoodDeeds Ltd`).should('exist');
    });
});