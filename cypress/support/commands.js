Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('input[id="firstName"]').type('Darlon')
    cy.get('input[id="lastName"]').type('Marca')
    cy.get('input[id="email"]').type('darlonsm@gmail.com')
    cy.get('textarea[id="open-text-area"]').type('teste')
    cy.contains('button', 'Enviar').click()
})