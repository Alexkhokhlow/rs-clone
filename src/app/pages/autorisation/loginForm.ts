import Lang from '../../common/lang/lang';
import Server from '../../server/server';
import Common from '../../utils/common';
import EntryWays from './entryWays';

const server = new Server();

export default class LoginForm {
  static otherEntryWays = ['Google'];
  // static otherEntryWays = ['Google', 'msft', 'Apple', 'Slack'];

  form: HTMLElement;

  formTitle: HTMLElement;

  errorMessage: HTMLElement;

  inputsContainer: HTMLElement;

  loginInput: HTMLElement;

  passwordInput: HTMLElement;

  btnSubmit: HTMLElement;

  seperetor: HTMLElement;

  entryWays: HTMLElement[];

  linkToSingup: HTMLElement;

  text: Lang;

  constructor() {
    this.text = new Lang();
    this.form = Common.createDomNode('div', ['login__form']);
    this.formTitle = Common.createDomNode('h1', ['login__title'], this.text.text.login.login);
    this.errorMessage = Common.createDomNode('p', ['login__error', 'invisible'], this.text.text.login.invalid);
    this.inputsContainer = Common.createDomNode('div', ['inputs__container']);
    this.loginInput = Common.createDOMNodeInput('email', ['input_email'], 'text', this.text.text.login.email);
    this.passwordInput = Common.createDOMNodeInput(
      'password',
      ['input_password', 'invisible'],
      'password',
      this.text.text.login.password
    );
    this.btnSubmit = Common.createDOMNodeInput('submit', ['input_sublit', 'btn', 'btn_submit'], 'submit');
    this.seperetor = Common.createDomNode('div', ['form__separator'], this.text.text.login.or);
    this.entryWays = LoginForm.otherEntryWays.map((elem) => {
      return new EntryWays(elem).render();
    });
    this.linkToSingup = Common.createDomNodeLink(['form__link'], '/signup', this.text.text.login.sing);
  }

  public render() {
    this.form.append(this.formTitle, this.errorMessage, this.inputsContainer, this.seperetor);
    if (this.btnSubmit instanceof HTMLInputElement) {
      this.btnSubmit.value = this.text.text.login.continue;
      this.btnSubmit.setAttribute('disabled', 'disabled');
    }
    this.inputsContainer.append(this.loginInput, this.passwordInput, this.btnSubmit);
    this.entryWays.forEach((way) => {
      this.form.append(way);
    });
    this.form.append(this.linkToSingup);

    this.addHandlers();

    const mailFromLocalStorage = localStorage.getItem('data');
    if (mailFromLocalStorage && this.loginInput instanceof HTMLInputElement) {
      this.loginInput.value = mailFromLocalStorage;
      this.btnSubmit.removeAttribute('disabled');
      this.openPasswordInput();
    }

    return this.form;
  }

  private addHandlers() {
    this.loginInput.addEventListener('input', (e) => {
      if (e.target) {
        this.changeActivityofBtn(this.isValidMail((e.target as HTMLInputElement).value), this.btnSubmit);
      }
    });

    this.btnSubmit.addEventListener('click', async (e) => {
      e.preventDefault();
      this.mailToLocalStorage();
      if (e.target instanceof HTMLInputElement) {
        if (e.target.value === this.text.text.login.continue) {
          this.openPasswordInput();
        } else {
          await this.checkLoginPassword(
            (this.loginInput as HTMLInputElement).value.trim(),
            (this.passwordInput as HTMLInputElement).value.trim()
          );
        }
      }
    });

    this.linkToSingup.addEventListener('click', () => {
      this.mailToLocalStorage();
    });
  }

  private openPasswordInput() {
    if (this.btnSubmit instanceof HTMLInputElement) this.btnSubmit.value = this.text.text.header.logIn;
    this.passwordInput.classList.remove('invisible');
  }

  private async checkLoginPassword(login: string, password: string) {
    if (login === '' || password === '') {
      this.showErrorMessage();
    } else {
      this.btnSubmit.setAttribute('disabled', 'disabled');
      try {
        const result = await server.login(login, password);
        localStorage.setItem('token', result.token);
        window.location.href = 'workspace';
      } catch (error) {
        this.showErrorMessage();
      }
      this.btnSubmit.removeAttribute('disabled');
    }
  }

  private showErrorMessage() {
    this.errorMessage.classList.remove('invisible');
  }

  private mailToLocalStorage() {
    localStorage.setItem('data', (this.loginInput as HTMLInputElement).value);
  }

  private isValidMail(mail: string) {
    const regExp = /^([a-zA-Z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{1,6}$/;
    return regExp.test(mail);
  }

  private changeActivityofBtn(condition: boolean, btn: HTMLElement) {
    if (condition) {
      btn.removeAttribute('disabled');
    } else {
      btn.setAttribute('disabled', 'disabled');
    }
  }
}
