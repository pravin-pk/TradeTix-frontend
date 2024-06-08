const HomePage = function () {
    this.title = element(by.css('.logo'));
    this.exploreButton = element(by.cssContainingText('a', 'Explore'));
    this.socialLinks = element.all(by.css('.social a'));
};

describe('Home Page', function () {
    const homePage = new HomePage();

    beforeEach(function () {
        browser.waitForAngularEnabled(false);
        browser.get('https://trade-tix-frontend.vercel.app/home');
    });

    it('should have a title', function () {
        expect(homePage.title.getText()).toEqual('TRADETIX');
    });

    it('should navigate to sign up page when explore button is clicked', function () {
        homePage.exploreButton.click();
        expect(browser.getCurrentUrl()).toContain('/sign-up');
    });

    it('should have social media links', function () {
        expect(homePage.socialLinks.count()).toBe(3);
    });
});

const SignupPage = function() {
  this.signupTitle = element(by.css('.opacity'));
  this.signupForm = element(by.xpath('/html/body/app-root/app-signup/section/div[1]/div[2]/form'));
  // this.inputFields = this.signupForm.all(by.css('input'));
  this.usernameField = element(by.xpath('/html/body/app-root/app-signup/section/div[1]/div[2]/form/input[1]'))
  this.emailField = element(by.xpath('/html/body/app-root/app-signup/section/div[1]/div[2]/form/input[2]'))
  this.passwordField = element(by.xpath('/html/body/app-root/app-signup/section/div[1]/div[2]/form/input[3]'))
  this.submitButton = element(by.xpath('/html/body/app-root/app-signup/section/div[1]/div[2]/form/button'));
  this.signInLink = element(by.cssContainingText('a', 'Already User?'));
};

describe('signup page', function() {
  const signupPage = new SignupPage();

  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get('https://trade-tix-frontend.vercel.app/sign-up');
  });

  it('should have a title', function() {
    expect(signupPage.signupTitle.getText()).toEqual('SIGN-UP');
  });

  it('should be able to register', async function() {
    signupPage.usernameField.sendKeys('shamik');
    signupPage.emailField.sendKeys('shamikn@sap.com');
    signupPage.passwordField.sendKeys('password');
    signupPage.submitButton.click();
    signupPage.submitButton.click();
    expect(await browser.getCurrentUrl()).toContain('/sign-up');
  });

  it('should have submit button', function() {
    expect(signupPage.submitButton.isPresent()).toBe(true);
  });

  it('should have sign in link', function() {
    expect(signupPage.signInLink.isPresent()).toBe(true);
  });
});

const SigninPage = function() {
  this.signinTitle = element(by.css('.opacity'));
  this.signinForm = element(by.xpath('/html/body/app-root/app-signin/section/div[1]/div[2]/form'));
  this.emailInput = this.signinForm.element(by.xpath('/html/body/app-root/app-signin/section/div[1]/div[2]/form/input[1]'));
  this.passwordInput = this.signinForm.element(by.xpath('/html/body/app-root/app-signin/section/div[1]/div[2]/form/input[2]'));
  this.submitButton = element(by.xpath('/html/body/app-root/app-signin/section/div[1]/div[2]/form/button'));
};

describe('signin page', function() {
  const signinPage = new SigninPage();

  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get('https://trade-tix-frontend.vercel.app/sign-in'); // replace with your actual URL
  });

  it('should have a title', function() {
    expect(signinPage.signinTitle.getText()).toEqual('SIGN-IN');
  });

  // write test to login a user 
  it('should login user', async function() {
    signinPage.emailInput.sendKeys('shamikg@sap.com');
    signinPage.passwordInput.sendKeys('password');
    signinPage.submitButton.click();
    signinPage.submitButton.click();
    expect(await browser.getCurrentUrl()).toContain('/sign-in');
  })

  it('should have submit button', function() {
    expect(signinPage.submitButton.isPresent()).toBe(true);
  });
});