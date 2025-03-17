describe('ListingPage Tests', () => {
    beforeEach(() => {
        // Visit the listing page before each test
        cy.visit('http://localhost:5173/listing');
    });

    it('Renders the ListingPage correctly', () => {
        // Check if the "Find Events" heading exists
        cy.get('h1').contains('Find Events').should('exist');
    });

    it('Renders the FilterEvents component', () => {
        // Check if the filter dropdowns exist
        cy.get('select').should('have.length', 4); // 4 filter dropdowns for non logged in users
        cy.contains('Sort By').should('exist');
        cy.contains('Filter By Month').should('exist');
        cy.contains('Filter By Start Time').should('exist');
        cy.contains('Filter By Status').should('exist');
    });

    it('Renders the EventList component', () => {
        // Check if the event cards are rendered
        cy.get('.card').should('exist'); // Event cards
        cy.contains('Loading...').should('not.exist'); // Ensure loading state is not displayed
        cy.contains('No events found').should('not.exist'); // Ensure no events message is not displayed
    });
});