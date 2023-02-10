import Common from '../../utils/common';
import EntryWays from './entryWays';

export default class SignupForm {
  static otherEntryWays = ['Google', 'msft', 'Apple', 'Slack'];

  form: HTMLElement;

  formTitle: HTMLElement;

  inputsContainer: HTMLElement;

  loginInput: HTMLElement;

  btnSubmit: HTMLElement;

  seperetor: HTMLElement;

  entryWays: HTMLElement[];

  linkToLoginPage: HTMLElement;

  constructor() {
    this.form = Common.createDomNode('div', ['login__form']);
    this.formTitle = Common.createDomNode('h1', ['login__title'], 'Sign up for your account');
    this.inputsContainer = Common.createDomNode('div', ['inputs__container']);
    this.loginInput = Common.createDOMNodeInput('email', ['input_email'], 'text', 'Enter email');
    this.btnSubmit = Common.createDOMNodeInput('submit', ['input_sublit', 'btn', 'btn_submit'], 'submit');
    this.seperetor = Common.createDomNode('div', ['form__separator'], 'OR');
    this.entryWays = SignupForm.otherEntryWays.map((elem) => {
      return new EntryWays(elem).render();
    });
    this.linkToLoginPage = Common.createDomNodeLink(['form__link'], '/login', 'Already have an account? Log In');
  }

  public render() {
    this.form.append(this.formTitle, this.inputsContainer, this.seperetor);

    if (this.btnSubmit instanceof HTMLInputElement) {
      this.btnSubmit.value = 'Continue';
      this.btnSubmit.setAttribute('disabled', 'disabled');
    }

    this.inputsContainer.append(this.loginInput, this.btnSubmit);

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
      // TODO: добавить регистрацию + введение пароля, имени  (сохранить в localStorage и перейти на главную страницу)
      if (this.loginInput instanceof HTMLInputElement) {
        console.log(this.loginInput.value);
      }
    });

    this.linkToLoginPage.addEventListener('click', () => {
      localStorage.setItem('email', (this.loginInput as HTMLInputElement).value);
    });
  }

  private isValidMail(mail: string) {
    const regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{1,6}$/;
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
