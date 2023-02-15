import Server from '../../server/server';
import Common from '../../utils/common';
import EntryWays from './entryWays';

const server = new Server();

export default class LoginForm {
  static otherEntryWays = ['Google', 'msft', 'Apple', 'Slack'];

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

  constructor() {
    this.form = Common.createDomNode('div', ['login__form']);
    this.formTitle = Common.createDomNode('h1', ['login__title'], 'Log in to Trello');
    this.errorMessage = Common.createDomNode(
      'p',
      ['login__error', 'invisible'],
      'Invalid email address and/or password.'
    );
    this.inputsContainer = Common.createDomNode('div', ['inputs__container']);
    this.loginInput = Common.createDOMNodeInput('email', ['input_email'], 'text', 'Enter email');
    this.passwordInput = Common.createDOMNodeInput(
      'password',
      ['input_password', 'invisible'],
      'password',
      'Enter password'
    );
    this.btnSubmit = Common.createDOMNodeInput('submit', ['input_sublit', 'btn', 'btn_submit'], 'submit');
    this.seperetor = Common.createDomNode('div', ['form__separator'], 'OR');
    this.entryWays = LoginForm.otherEntryWays.map((elem) => {
      return new EntryWays(elem).render();
    });
    this.linkToSingup = Common.createDomNodeLink(['form__link'], '/signup', 'Sign up for an account');
  }

  public render() {
    this.form.append(this.formTitle, this.errorMessage, this.inputsContainer, this.seperetor);
    if (this.btnSubmit instanceof HTMLInputElement) this.btnSubmit.value = 'Continue';
    this.inputsContainer.append(this.loginInput, this.passwordInput, this.btnSubmit);
    this.entryWays.forEach((way) => {
      this.form.append(way);
    });
    this.form.append(this.linkToSingup);

    this.addHandlers();

    const mailFromLocalStorage = localStorage.getItem('data');
    if (mailFromLocalStorage && this.loginInput instanceof HTMLInputElement) {
      this.loginInput.value = mailFromLocalStorage;
      this.openPasswordInput();
    }

    return this.form;
  }

  private addHandlers() {
    this.btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      this.mailToLocalStorage();
      if (e.target instanceof HTMLInputElement) {
        if (e.target.value === 'Continue') {
          this.openPasswordInput();
        } else {
          this.checkLoginPassword(
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
    if (this.btnSubmit instanceof HTMLInputElement) this.btnSubmit.value = 'Log in';
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
}
