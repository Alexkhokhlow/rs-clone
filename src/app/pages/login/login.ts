const logolink = require('../../../assets/loginPage/logo.svg') as string;
const bgLeftLink = require('../../../assets/loginPage/bgLeft.svg') as string;
const bgRightLink = require('../../../assets/loginPage/bgRight.svg') as string;
import Common from '../../utils/common';
import LoginForm from '../login/LoginForm';

export default class Login {
  login: HTMLElement;
  logo: HTMLElement;
  formConteiner: HTMLElement;
  footer: HTMLElement;
  form: LoginForm;
  bgLeft: HTMLElement;
  bgRight: HTMLElement;

  constructor() {
    this.login = Common.createDomNode('section', ['login__page']);
    this.logo = Common.createDomNodeImg(['logo, login__logo'], logolink);
    this.formConteiner = Common.createDomNode('div', ['form__conteiner']);
    this.footer = Common.createDomNode('section', ['login__footer']);
    this.form = new LoginForm();
    this.bgLeft = Common.createDomNodeImg(['bg__img, bg_left'], bgLeftLink);
    this.bgRight = Common.createDomNodeImg(['bg__img, bg_right'], bgRightLink);
    console.log('here');
    this.render();
  }

  private render() {
    this.login.append(this.logo, this.formConteiner, this.footer, this.bgLeft, this.bgRight);
    this.formConteiner.append(this.form.form);
  }
}

const loginPage = new Login();
