import Common from '../../utils/common';
import EntryWays from './entryWays';

export default class LoginForm {
  static otherEntryWays = ['Google', 'msft', 'Apple', 'Slack'];

  form: HTMLElement;

  formTitle: HTMLElement;

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
    this.form.append(this.formTitle, this.inputsContainer, this.seperetor);
    if (this.btnSubmit instanceof HTMLInputElement) this.btnSubmit.value = 'Continue';
    this.inputsContainer.append(this.loginInput, this.passwordInput, this.btnSubmit);
    this.entryWays.forEach((way) => {
      this.form.append(way);
    });
    this.form.append(this.linkToSingup);

    this.addHandlers();
    return this.form;
  }

  private addHandlers() {
    this.btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target instanceof HTMLInputElement) {
        if (e.target.value === 'Continue') {
          e.target.value = 'Log in';
          this.passwordInput.classList.remove('invisible');
        } else {
          this.checkLoginPassword(
            (this.loginInput as HTMLInputElement).value,
            (this.passwordInput as HTMLInputElement).value
          );
        }
      }
    });
  }

  private checkLoginPassword(login: string, password: string) {
    console.log(login, password);
    // TODO: добавить авторизацию (если зашёл, то сохранить в localStorage)
  }
}
