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
  this.usernameInput = element(by.css('[formControlName="username"]'));
  this.emailInput = element(by.css('[formControlName="email"]'));
  this.passwordInput = element(by.css('[formControlName="password"]'));
  this.submitButton = element(by.css('button[type="submit"]'));
};

describe('signup page', function() {
  const signupPage = new SignupPage();

  beforeEach(function() {
    browser.get('https://trade-tix-frontend.vercel.app/sign-up'); // replace with your actual URL
  });

  it('should have username, email, and password fields', function() {
    expect(signupPage.usernameInput.isPresent()).toBe(true);
    expect(signupPage.emailInput.isPresent()).toBe(true);
    expect(signupPage.passwordInput.isPresent()).toBe(true);
  });

  it('should have submit button disabled when form is invalid', function() {
    expect(signupPage.submitButton.getAttribute('disabled')).toEqual('true');
  });
});