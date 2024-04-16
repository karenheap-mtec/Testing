import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'



describe('My Login application', () => {
    //Positive Tests Here:
    it('should login with valid credentials - standard_user', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')

        await expect(InventoryPage.logoutLink).toBeExisting()
        await expect(browser).toHaveUrl(loginPage.loginRedirectURL)
        await InventoryPage.btnMenu.click()
        await InventoryPage.resetAppStateLink.click()
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

        await expect(InventoryPage.logoutLink).toBeExisting()
        await expect(browser).toHaveUrl(loginPage.loginRedirectURL)
        await InventoryPage.btnMenu.click()
        await InventoryPage.resetAppStateLink.click()
    })

    it('should login with valid credentials and not be able to remove from cart - problem_user', async () => {
        await LoginPage.open()
        await LoginPage.login('problem_user', 'secret_sauce')

        await expect(InventoryPage.logoutLink).toBeExisting()
        await expect(browser).toHaveUrl(loginPage.loginRedirectURL)
        await expect(InventoryPage.btnAddToCart).toBeExisting()
        await InventoryPage.btnAddToCart.click()
        await expect(InventoryPage.btnRemoveFromCart).toBeExisting()
        await InventoryPage.btnRemoveFromCart.click()
        await expect(InventoryPage.btnRemoveFromCart).toBeExisting()
        await expect (InventoryPage.resetAppStateLink).toBeExisting()
        await InventoryPage.btnMenu.click()
        await InventoryPage.resetAppStateLink.click()
    })

    it('should login with valid credentials - performance_glitch_user', async () => {
        await LoginPage.open()
        await LoginPage.login('performance_glitch_user', 'secret_sauce')

        await expect(InventoryPage.logoutLink).toBeExisting()
        await expect(browser).toHaveUrl(loginPage.loginRedirectURL)
        //await expect(InventoryPage.products).not.toBeExisting()
        await InventoryPage.btnMenu.click()
        await InventoryPage.resetAppStateLink.click()
    })

    it('should login with valid credentials - error _user cannot remove from cart', async () => {
        await LoginPage.open()
        await LoginPage. login('error_user', 'secret_sauce')
        await expect (InventoryPage.logoutLink).toBeExisting()
        await expect (browser).toHaveUrl(loginPage.loginRedirectURL)
        await InventoryPage.btnAddToCart.waitForDisplayed({timeout: 2000})
        await expect(InventoryPage.btnAddToCart).toBeExisting()
        await InventoryPage.btnAddToCart.click()
        await expect(InventoryPage.btnRemoveFromCart).toBeExisting()
        await InventoryPage.btnRemoveFromCart.click()
        await expect(InventoryPage.btnRemoveFromCart).toBeExisting()
        await InventoryPage.btnMenu.click()
        await InventoryPage.resetAppStateLink.click()
    })

    it('should login with valid credentials - visual_user', async () => {
        await LoginPage.open()
        await LoginPage.login('visual_user', 'secret_sauce')

        await expect(InventoryPage.logoutLink).toBeExisting()
        await expect(browser).toHaveUrl(loginPage.loginRedirectURL)
        await InventoryPage.btnMenu.click()
        await InventoryPage.resetAppStateLink.click()
    })

    //Negative Tests Here:
    it('should not login with invalid credentials - standard_user', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauceB')

        await expect(browser).toHaveUrl(loginPage.loginPageURL)
        await expect(LoginPage.headerError).toBeExisting()
        await expect(LoginPage.headerError).toHaveHTML(expect.stringContaining('Epic sadface: Username and password do not match any user in this service'))
    })

    it('should not login with invalid credentials - locked_out_user', async () => {
        await LoginPage.open()
        await LoginPage.login('locked_out_user', 'secret_sauceB')

        await expect(browser).toHaveUrl(loginPage.loginPageURL)
        await expect(LoginPage.headerError).toBeExisting()
        await expect(LoginPage.headerError).toHaveHTML(expect.stringContaining('Epic sadface: Username and password do not match any user in this service'))
    })

    it('should not login with invalid credentials - problem_user', async () => {
        await LoginPage.open()
        await LoginPage.login('problem_user', 'secret_sauceB')

        await expect(browser).toHaveUrl(loginPage.loginPageURL)
        await expect(LoginPage.headerError).toBeExisting()
        await expect(LoginPage.headerError).toHaveHTML(expect.stringContaining('Epic sadface: Username and password do not match any user in this service'))
    })

    it('should not login with invalid credentials - performance_glitch_user', async () => {
        await LoginPage.open()
        await LoginPage.login('performance_glitch_user', 'secret_sauceB')

        await expect(browser).toHaveUrl(loginPage.loginPageURL)
        await expect(LoginPage.headerError).toBeExisting()
        await expect(LoginPage.headerError).toHaveHTML(expect.stringContaining('Epic sadface: Username and password do not match any user in this service'))
    })

    it('should not login with invalid credentials - error_user', async () => {
        await LoginPage.open()
        await LoginPage.login('error_user', 'secret_sauceB')

        await expect(browser).toHaveUrl(loginPage.loginPageURL)
        await expect(LoginPage.headerError).toBeExisting()
        await expect(LoginPage.headerError).toHaveHTML(expect.stringContaining('Epic sadface: Username and password do not match any user in this service'))
    })

    it('should not login with invalid credentials - visual_user', async () => {
        await LoginPage.open()
        await LoginPage.login('visual_user', 'secret_sauceB')

        await expect(browser).toHaveUrl(loginPage.loginPageURL)
        await expect(LoginPage.headerError).toBeExisting()
        await expect(LoginPage.headerError).toHaveHTML(expect.stringContaining('Epic sadface: Username and password do not match any user in this service'))
    })

    it('should not login with invalid credentials - blank username', async () => {
        await LoginPage.open()
        await LoginPage.login('', 'secret_sauce')

        await expect(browser).toHaveUrl(loginPage.loginPageURL)
        await expect(LoginPage.headerError).toBeExisting()
        await expect(LoginPage.headerError).toHaveHTML(expect.stringContaining('Epic sadface: Username is required'))
    })

})