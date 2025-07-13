import * as data from '../helpers/user_data.json';
import * as authorization from '../locators/authorization.json';
import * as master_page from '../locators/master_page_p.json';
import * as mytrainer_page from '../locators/trainer_card.json';
import * as avatar_page from '../locators/avatar_page.json';
import * as payment from '../locators/payment.json';
import * as data_card from '../helpers/data_card.json';

describe('Покупка аватара', function () {

    it('Полный flow покупки аватара', function () {
        cy.visit('https://pokemonbattle.ru/login');
        cy.get(authorization.email).type(data.login);
        cy.get(authorization.password).type(data.password);
        cy.get(authorization.login_button).click();
        cy.get(master_page.exit).should('be.visible');
        cy.get(master_page.profile).click();
        cy.get(mytrainer_page.avatar_shop).click();
        cy.get(avatar_page.avatar).find(avatar_page.button).first().click();
        cy.get(payment.card_number).type(data_card.card_number);
        cy.get(payment.time).type(data_card.time);
        cy.get(payment.cvv).type(data_card.cvv);
        cy.get(payment.name).type(data_card.name);
        cy.get(payment.button_payment).click();
        cy.get(payment.sms_button).type(data_card.sms_code);
        cy.get(payment.button_payment).click();
        cy.get(payment.final_title).should('have.text', 'Покупка прошла успешно');
        cy.get(payment.back_base_link).click();

    });
});