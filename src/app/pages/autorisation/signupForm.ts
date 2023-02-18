import Server from '../../server/server';
import Common from '../../utils/common';
import EntryWays from './entryWays';

const server = new Server();

export default class SignupForm {
  static otherEntryWays = ['Google', 'msft', 'Apple', 'Slack'];

  form: HTMLElement;

  formTitle: HTMLElement;

  errorMessage: HTMLElement;

  inputsContainer: HTMLElement;

  loginInput: HTMLElement;

  passwordInput: HTMLElement;

  nameInput: HTMLElement;

  btnSubmit: HTMLElement;

  seperetor: HTMLElement;

  entryWays: HTMLElement[];

  linkToLoginPage: HTMLElement;

  constructor() {
    this.form = Common.createDomNode('div', ['login__form']);
    this.formTitle = Common.createDomNode('h1', ['login__title'], 'Sign up for your account');
    this.errorMessage = Common.createDOMNode('p', ['login__error', 'invisible']);
    this.inputsContainer = Common.createDomNode('div', ['inputs__container']);
    this.loginInput = Common.createDOMNodeInput('email', ['input_email'], 'text', 'Enter email');
    this.passwordInput = Common.createDOMNodeInput(
      'password',
      ['input_password', 'invisible'],
      'password',
      'Enter password'
    );
    this.nameInput = Common.createDOMNodeInput('name', ['input_name', 'invisible'], 'text', 'Enter your name');
    this.btnSubmit = Common.createDOMNodeInput('submit', ['input_sublit', 'btn', 'btn_submit'], 'submit');
    this.seperetor = Common.createDomNode('div', ['form__separator'], 'OR');
    this.entryWays = SignupForm.otherEntryWays.map((elem) => {
      return new EntryWays(elem).render();
    });
    this.linkToLoginPage = Common.createDomNodeLink(['form__link'], '/login', 'Already have an account? Log In');
  }

  public render() {
    this.form.append(this.formTitle, this.errorMessage, this.inputsContainer, this.seperetor);

    if (this.btnSubmit instanceof HTMLInputElement) {
      this.btnSubmit.value = 'Continue';
      this.btnSubmit.setAttribute('disabled', 'disabled');
    }

    this.inputsContainer.append(this.loginInput, this.passwordInput, this.nameInput, this.btnSubmit);

    this.entryWays.forEach((way) => {
      this.form.append(way);
    });

    this.form.append(this.linkToLoginPage);

    this.addHandlers();

    const mailFromLocalStorage = localStorage.getItem('email');
    if (mailFromLocalStorage && this.loginInput instanceof HTMLInputElement) {
      this.loginInput.value = mailFromLocalStorage;
      this.changeActivityofBtn(this.isValidMail(mailFromLocalStorage), this.btnSubmit);
    }

    return this.form;
  }

  private addHandlers() {
    this.loginInput.addEventListener('input', (e) => {
      if (e.target) {
        this.changeActivityofBtn(this.isValidMail((e.target as HTMLInputElement).value), this.btnSubmit);
      }
    });

    this.btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.loginInput instanceof HTMLInputElement && this.btnSubmit instanceof HTMLInputElement) {
        if (this.btnSubmit.value === 'Continue') {
          const mail = this.loginInput.value.trim();
          this.checkMail(mail);
        } else if (
          this.btnSubmit.value === 'Sign up' &&
          this.passwordInput instanceof HTMLInputElement &&
          this.nameInput instanceof HTMLInputElement
        ) {
          const mail = this.loginInput.value.trim();
          const password = this.passwordInput.value.trim();
          const name = this.nameInput.value.trim();
          if (this.isValidMail(mail) && password !== '' && name !== '') {
            this.singUp(mail, password, name);
          } else {
            this.showErrorMessage();
          }
        }
      }
    });

    this.linkToLoginPage.addEventListener('click', () => {
      this.mailToLocalStorage();
    });
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

  private showErrorMessage() {
    if (this.btnSubmit instanceof HTMLInputElement) {
      if (this.btnSubmit.value === 'Sign up') {
        this.errorMessage.innerHTML = 'Invalid email address and/or password and/or name.';
      } else {
        this.errorMessage.innerHTML =
          'It looks like you have already registered an account using this email address. <a href=/login class="message__link">Log in</a>.';
      }
    }

    this.errorMessage.classList.remove('invisible');
  }

  private deleteErrorMessage() {
    this.errorMessage.classList.add('invisible');
  }

  private async checkMail(mail: string) {
    this.btnSubmit.setAttribute('disabled', 'disabled');
    try {
      await server.checkEmail(mail);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message !== 'An error has occurred: This mail is busy') {
          this.passwordInput.classList.remove('invisible');
          this.nameInput.classList.remove('invisible');
          (this.btnSubmit as HTMLButtonElement).value = 'Sign up';
          this.deleteErrorMessage();
        } else {
          this.showErrorMessage();
        }
      }
    } finally {
      this.btnSubmit.removeAttribute('disabled');
    }
  }

  private async singUp(mail: string, password: string, name: string) {
    this.changeActivityofBtn(false, this.btnSubmit);
    try {
      await server.signUp(mail, password, name);
      this.deleteErrorMessage();
      this.mailToLocalStorage();
      window.location.href = 'login';
    } catch (error) {
      this.showErrorMessage();
    }
    this.changeActivityofBtn(true, this.btnSubmit);
  }
}
