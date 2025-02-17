/// <reference types="Cypress" />

//const { each } = require("cypress/types/bluebird");

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach( function () {
        cy.visit('./src/index.html')
    });

    it('verifica o título da aplicação', function() {
                cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste'
        cy.get('input[id="firstName"]').type('Darlon')
        cy.get('input[id="lastName"]').type('Marca')
        cy.get('input[id="email"]').type('darlonsm@gmail.com')
        cy.get('textarea[id="open-text-area"]').type(longText, {delay : 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    });
    
   it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('input[id="firstName"]').type('Darlon')
    cy.get('input[id="lastName"]').type('Marca')
    cy.get('input[id="email"]').type('darlonsmgmail.com')
    cy.get('textarea[id="open-text-area"]').type('Texto')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
   });

   it('Campo continua vazio após digitar campo não numérico', function() {
        cy.get('#phone').type('sfsdgfgfh').should('have.value', '')
   });
    
   it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('input[id="firstName"]').type('Darlon')
    cy.get('input[id="lastName"]').type('Marca')
    cy.get('input[id="email"]').type('darlonsm@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('textarea[id="open-text-area"]').type('Texto')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
   });

   it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('input[id="firstName"]').type('Darlon')
        .should('have.value', 'Darlon')
        .clear()
        .should('have.value', '')
    cy.get('input[id="lastName"]').type('Marca')
        .should('have.value', 'Marca')
        .clear()
        .should('have.value', '')  
    cy.get('input[id="email"]').type('darlonsm@gmail.com') 
        .should('have.value', 'darlonsm@gmail.com')  
        .clear()
        .should('have.value', '')  
    cy.get('#phone').type('1234567890') 
        .should('have.value', '1234567890')
        .clear()
        .should('have.value', '')
   });

   it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
   });

   it('Envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
   });

   it('seleciona um produto (YouTube) por seu texto', function() {
    cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
   });

   it('seleciona um produto (Mentoria) por seu valor (value)', function() {
    cy.get('#product')
        .select('Mentoria')
        .should('have.value', 'mentoria')    
   });

   it('seleciona um produto (Blog) por seu índice', function() {
    cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
   });

   it('marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value','feedback')
   });

   it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
   });

   it('marca ambos checkboxes, depois desmarca o último', function() {
    cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('be.not.checked')
   });

   it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
   });

   it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
   });

   it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
   });

})
  