import * as master_page from '../locators/master_page.json';
import * as rezult2_page from '../locators/rezult2_page.json'
import * as data from '../helpers/data.json'
import * as recovery from '../locators/recovery.json'


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('https://login.qa.studio/');

    })
    afterEach('Конец теста', function () {
        cy.get(rezult2_page.exit).should('be.visible');
    })

    it('верный логин и пароль', function () {
        cy.get(master_page.email2).type(data.login1);
        cy.get(master_page.password2).type(data.password1);
        cy.get(master_page.login_button2).click();

    })

    it('восстановления пароля', function () {
        cy.get(master_page.fogot_pass_btn2).click();
        cy.get(recovery.email).type(data.login1);
        cy.get(recovery.send_button).click();
        cy.get(rezult2_page.title2).should('have.text', 'Успешно отправили пароль на e-mail');
    })

    it('неверный пароль', function () {
        cy.get(master_page.email2).type(data.login1);
        cy.get(master_page.password2).type('12345678');
        cy.get(master_page.login_button2).click();
        cy.get(rezult2_page.title2).should('have.text', 'Такого логина или пароля нет');


    });
    it('неправильный логин', function () {
        cy.get(master_page.email2).type('test@test.ru');
        cy.get(master_page.password2).type(data.password1);
        cy.get(master_page.login_button2).click();
        cy.get(rezult2_page.title2).should('have.text', 'Такого логина или пароля нет');


    })

    it('невалидный email', function () {
        cy.get(master_page.email2).type('testtest.ru');
        cy.get(master_page.password2).type(data.password1);
        cy.get(master_page.login_button2).click();
        cy.get(rezult2_page.title2).should('have.text', 'Нужно исправить проблему валидации');

    })
    it('проверка регистра email', function () {
        cy.get(master_page.email2).type('GerMan@Dolnikov.ru');
        cy.get(master_page.password2).type(data.password1);
        cy.get(master_page.login_button2).click();
        cy.get(rezult2_page.title2).should('have.text', 'Авторизация прошла успешно');
    })
})