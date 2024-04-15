import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'
import loginPage from '../pageobjects/login.page.js'



describe('My Login application', () => {
    it('should login with valid credentials - standard_user', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')

        await expect(SecurePage.logoutLink).toBeExisting()
        await expect(browser).toHaveUrl(loginPage.loginRedirectURL)
    })
    it('should not allow a locked user to login - locked_out_user', async () => {
        await LoginPage.open()
        await LoginPage.login('locked_out_user', 'secret_sauce')
        
        await expect(browser).toHaveUrl(loginPage.loginPageURL)
        await expect(LoginPage.headerError).toBeExisting()
        await expect(LoginPage.headerError).toHaveHTML(expect.stringContaining('Epic sadface: Sorry, this user has been locked out.'))
       
    })
    it('should login with valid credentials - problem_user', async () => {
        await LoginPage.open()
        await LoginPage.login('problem_user', 'secret_sauce')

        await expect(SecurePage.logoutLink).toBeExisting()
        await expect(browser).toHaveUrl(loginPage.loginRedirectURL)
    })
    it('should login with valid credentials and not be able to remove from cart - problem_user', async () => {
        await LoginPage.open()
        await LoginPage.login('problem_user', 'secret_sauce')

        await expect(SecurePage.logoutLink).toBeExisting()
        await expect(browser).toHaveUrl(loginPage.loginRedirectURL)
        await expect(SecurePage.btnAddToCart).toBeExisting()
        await SecurePage.btnAddToCart.click()
        await expect(SecurePage.btnRemoveFromCart).toBeExisting()
        await SecurePage.btnRemoveFromCart.click()
        await expect(SecurePage.btnRemoveFromCart).toBeExisting()
    })
    it('should not login with invalid credentials - blank username', async () => {
        await LoginPage.open()
        await LoginPage.login('', 'secret_sauce')

        await expect(browser).toHaveUrl(loginPage.loginPageURL)
        await expect(LoginPage.headerError).toBeExisting()
        await expect(LoginPage.headerError).toHaveHTML(expect.stringContaining('Epic sadface: Username is required'))
    })
})