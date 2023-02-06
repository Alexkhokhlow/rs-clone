import Common from '../../../utils/common';

export default class Start {
  public section: HTMLElement;

  private wrapper: HTMLElement;

  private title: HTMLElement;

  public form: HTMLElement;

  private email: HTMLInputElement;

  public submit: HTMLButtonElement;

  constructor() {
    this.section = Common.createDomNode('section', ['start']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'start__wrapper']);
    this.title = Common.createDomNode('h2', ['start__title'], 'Get started with Trello today');
    this.form = Common.createDomNode('div', ['start__form']);
    this.email = Common.createDomNodeInput('Email', 'email', ['start__email'], 'email');
    this.submit = Common.createDomNodeButton(['button', 'start__submit', 'submit'], "Sign up - it's free!", 'submit');
    this.submit.addEventListener('click', () => {
      localStorage.setItem('data', this.email.value);
      window.location.href = '/signup';
    });
  }

  public append() {
    this.form.append(this.email, this.submit);
    this.wrapper.append(this.title, this.form);
    this.section.append(this.wrapper);

    return this.section;
  }
}
