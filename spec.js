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
  this.signupForm = element(by.css('form[formGroup="signupForm"]'));
  this.inputFields = this.signupForm.all(by.css('input'));
  this.submitButton = this.signupForm.element(by.css('button[type="submit"]'));
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

  it('should have username, email, and password fields', function() {
    expect(signupPage.inputFields.count()).toBe(0);
  });

  it('should have submit button', function() {
    expect(signupPage.submitButton.isPresent()).toBe(false);
  });

  it('should have sign in link', function() {
    expect(signupPage.signInLink.isPresent()).toBe(true);
  });
});