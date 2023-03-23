/// <reference types="cypress" />

const perfil = require('../fixtures/perfil.json')
import EnderecoPage from '../support/page_objects/endereco.page'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.login(perfil.usuario, perfil.senha)

        EnderecoPage.editarEnderecoFaturamento(perfil.nome, perfil.sobrenome, perfil.empresa, perfil.pais, perfil.endereco, perfil.numero, perfil.cidade, perfil.estado, perfil.cep, perfil.telefone, perfil.usuario)
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
        EnderecoPage.editarEnderecoEntrega(perfil.nome, perfil.sobrenome, perfil.empresa, perfil.pais, perfil.endereco, perfil.numero, perfil.cidade, perfil.estado, perfil.cep)
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')

        cy.visit('produtos')
        cy.addProdutos('Abominable Hoodie', 'M', 'Green', 4)
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        cy.get('#payment_method_cod').check()
        cy.get('#terms').check()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
        //TODO 
    });

})