import Common from '../../utils/common';
import Footer from './footer';
import LoginForm from './loginForm';
import SignupForm from './signupForm';

const logolink = require('../../../assets/loginPage/logo.svg') as string;
const bgLeftLink = require('../../../assets/loginPage/bgLeft.svg') as string;
const bgRightLink = require('../../../assets/loginPage/bgRight.svg') as string;

console.log(logolink);

const loginForm = new LoginForm();
const signupForm = new SignupForm();

export default class Autorisation {
  login: HTMLElement;

  logo: HTMLElement;

  formConteiner: HTMLElement;

  footer: HTMLElement;

  loginForm: HTMLElement;

  signupForm: HTMLElement;

  bgLeft: HTMLElement;

  bgRight: HTMLElement;

  constructor() {
    this.login = Common.createDomNode('section', []);
    this.logo = Common.createDomNodeImg(['logo', 'login__logo'], logolink);
    this.formConteiner = Common.createDomNode('div', ['form__conteiner']);
    this.footer = Common.createDomNode('section', ['login__footer']);
    this.loginForm = loginForm.render();
    this.signupForm = signupForm.render();
    this.bgLeft = Common.createDomNodeImg(['bg__img', 'bg_left'], bgLeftLink);
    this.bgRight = Common.createDomNodeImg(['bg__img', 'bg_right'], bgRightLink);
    this.footer = new Footer().render();
  }

  public render() {
    const path = window.location.pathname;
    this.login.append(this.logo, this.formConteiner, this.footer, this.bgLeft, this.bgRight, this.footer);
    if (path === '/login') {
      this.login.classList.add('login__page');
      this.formConteiner.append(this.loginForm);
    } else {
      this.login.classList.add('signup__page');
      this.formConteiner.append(this.signupForm);
    }
    return this.login;
  }
}
