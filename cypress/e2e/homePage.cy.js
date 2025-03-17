describe('HomePage Tests', () => {
    beforeEach(() => {
        // Visit the home page before each test
        cy.visit('http://localhost:5173/');
    });

    it('Renders the Hero component', () => {
        // Check if the Hero component exists
        cy.get('.hero').should('exist'); // Hero section
        cy.get('.hero-content').should('exist'); // Hero content
        cy.get('h1').contains('Welcome to GoodDeeds').should('exist'); // Hero heading
        cy.get('button').contains('Explore Opportunities').should('exist'); // Hero button
    });

    it('Renders the "Our Story" heading', () => {
        // Check if the "Our Story" heading exists
        cy.get('h1').contains('Our Story').should('exist');
    });

    it('Renders the ImageCard component', () => {
        // Check if the ImageCard component exists
        cy.get('.card').contains('What is GoodDeeds?').should('exist'); // ImageCard heading
        cy.get('img[src="/img/volunteer1.png"]').should('exist'); // ImageCard image
    });

    it('Renders the DualImageCard component', () => {
        // Check if the DualImageCard component exists
        cy.get('.card').contains('What is GoodDeeds?').should('exist'); // DualImageCard heading
        cy.get('img[src="/img/volunteer2.png"]').should('exist'); // DualImageCard image 1
        cy.get('img[src="/img/volunteer3.png"]').should('exist'); // DualImageCard image 2
    });

    it('Renders the ImageCardReverse component', () => {
        // Check if the ImageCardReverse component exists
        cy.get('.card').contains('Benefits of Volunteering with GoodDeeds').should('exist'); // ImageCardReverse heading
        cy.get('img[src="/img/volunteer4.png"]').should('exist'); // ImageCardReverse image
    });

    it('Renders the DualInfoCard component', () => {
        // Check if the DualInfoCard component exists
        cy.get('h1').contains('Why volunteers love us').should('exist'); // DualInfoCard heading
        cy.get('h1').contains('Why organizations love us').should('exist'); // DualInfoCard heading
    });

    it('Renders the ContactForm component', () => {
        // Check if the ContactForm component exists
        cy.get('form').should('exist'); // ContactForm form
        cy.get('input[placeholder="Name"]').should('exist'); // Name input
        cy.get('input[placeholder="email@example.com"]').should('exist'); // Email input
        cy.get('textarea[placeholder="Message"]').should('exist'); // Message textarea
        cy.get('button').contains('Send Message').should('exist'); // Submit button
    });

    it('Renders the "Frequently Asked Questions" heading', () => {
        // Check if the "Frequently Asked Questions" heading exists
        cy.get('h1').contains('Frequently Asked Questions').should('exist');
    });

    it('Renders the Accordion component', () => {
        // Check if the Accordion component exists
        cy.get('.collapse').should('exist'); // Accordion collapse
        cy.get('.collapse-title').contains('What is GoodDeeds?').should('exist'); // Accordion question
    });
});