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
    // эта кнопка disabled, пока почта не валидна
    this.seperetor = Common.createDomNode('div', ['form__separator'], 'OR');
    this.entryWays = SignupForm.otherEntryWays.map((elem) => {
      return new EntryWays(elem).render();
    });
    this.linkToLoginPage = Common.createDomNodeLink(['form__link'], '/login', 'Already have an account? Log In');
  }

  public render() {
    this.btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      // TODO: добавить авторизацию (если зашёл, то сохранить в localStorage)
      if (this.loginInput instanceof HTMLInputElement) {
        console.log(this.loginInput.value);
      }
    });
    this.form.append(this.formTitle, this.inputsContainer, this.seperetor);
    if (this.btnSubmit instanceof HTMLInputElement) this.btnSubmit.value = 'Continue';
    this.inputsContainer.append(this.loginInput, this.btnSubmit);
    this.entryWays.forEach((way) => {
      this.form.append(way);
    });
    this.form.append(this.linkToLoginPage);
    return this.form;
  }
}
