import Common from '../../../utils/common';

export default class Start {
  public section: HTMLElement;

  private wrapper: HTMLElement;

  private title: HTMLElement;

  public emailWrapper: HTMLElement;

  private email: HTMLInputElement;

  public submit: HTMLButtonElement;

  constructor() {
    this.section = Common.createDomNode('section', ['start']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'start__wrapper']);
    this.title = Common.createDomNode('h2', ['start__title'], 'Get started with Trello today');
    this.emailWrapper = Common.createDomNode('div', ['start__form']);
    this.email = Common.createDomNodeInput('Email', 'email', ['start__email'], 'email');
    this.submit = Common.createDomNodeButton(['button', 'start__submit', 'submit'], "Sign up - it's free!");
  }

  public append() {
    this.emailWrapper.append(this.email, this.submit);
    this.wrapper.append(this.title, this.emailWrapper);
    this.section.append(this.wrapper);
    Common.setLocalEmail(this.submit, this.email);

    return this.section;
  }


}
