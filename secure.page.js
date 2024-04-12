import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    /**
     * define selectors using getter methods
     */
    //get logoutPage () {
       // return $('#logout_sidebar_link');
    //}
//}

get flashAlert () {
    return $('#logout_sidebar_link');
}
}

export default new SecurePage();
