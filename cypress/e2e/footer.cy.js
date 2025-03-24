describe('Footer Tests', () => {
    beforeEach(() => {
        // Visit the home page before each test
        cy.visit('/');
    });

    it('Renders the Footer correctly', () => {
        // Check if the footer exists
        cy.get('footer').should('exist');

        // Check if the "About us" link exists and navigates to the correct route
        cy.get('footer a[href="/#our-story"]').contains('About us').should('exist');
        cy.get('footer a[href="/#our-story"]').contains('About us').click();
        cy.url().should('include', '/#our-story');

        // Check if the "Contact" link exists and navigates to the correct route
        cy.get('footer a[href="/#contact-form"]').contains('Contact').should('exist');
        cy.get('footer a[href="/#contact-form"]').contains('Contact').click();
        cy.url().should('include', '/#contact-form');

        // Check if the "Events" link exists and navigates to the correct route
        cy.get('footer a[href="/listing"]').contains('Events').should('exist');
        cy.get('footer a[href="/listing"]').contains('Events').click();
        cy.url().should('include', '/listing');

        // Check if the "FAQ" link exists and navigates to the correct route
        cy.get('footer a[href="/#faq"]').contains('FAQ').should('exist');
        cy.get('footer a[href="/#faq"]').contains('FAQ').click();
        cy.url().should('include', '/#faq');

        // Check if the social media icons exist and have the correct attributes
        const socialIcons = [
            { index: 0, platform: 'Twitter', viewBox: '0 0 24 24' },
            { index: 1, platform: 'YouTube', viewBox: '0 0 24 24' },
            { index: 2, platform: 'Facebook', viewBox: '0 0 24 24' },
        ];

        socialIcons.forEach((icon) => {
            cy.get('footer svg[width="24"][height="24"]')
                .eq(icon.index)
                .should('exist')
                .and('have.attr', 'viewBox', icon.viewBox)
                .and('have.attr', 'class', 'fill-current hover:text-blue-500 hover:scale-110 transition-all duration-300');
        });

        // Check if the copyright text exists and includes the current year
        const currentYear = new Date().getFullYear();
        cy.get('footer aside p')
            .should('exist')
            .and('have.text', `Copyright © ${currentYear} - All right reserved by GoodDeeds Ltd`);
    });
});