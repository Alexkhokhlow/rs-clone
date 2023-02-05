import Common from '../../../utils/common';

export default class SignupSection {
  public section: HTMLElement;

  private wrapper: HTMLElement;

  private textContainer: HTMLElement;

  private title: HTMLElement;

  private subtitle: HTMLElement;

  private form: HTMLFormElement;

  public email: HTMLInputElement;

  public submit: HTMLButtonElement;

  private image: HTMLElement;

  constructor() {
    this.section = Common.createDomNode('section', ['signup__section']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'signup__wrapper']);
    this.textContainer = Common.createDomNode('div', ['signup__container__text']);
    this.title = Common.createDomNode(
      'h1',
      ['signup__title'],
      'Trello brings all your tasks, teammates, and tools together'
    );
    this.subtitle = Common.createDomNode(
      'h3',
      ['signup__subtitle'],
      "Keep everything in the same place — even if your team isn't."
    );
    this.form = Common.createDomNode('form', ['signup__form']) as HTMLFormElement;
    this.form.action = '/signup';
    this.email = Common.createDomNodeInput('Email', 'email', ['signup__email'], 'email');
    this.submit = Common.createDomNodeButton(['button', 'signup__submit', 'submit'], "Sign up - it's free!", 'submit');
    this.image = Common.createDomNode('div', ['signup__image']);
  }

  public append() {
    this.form.append(this.email, this.submit);
    this.textContainer.append(this.title, this.subtitle, this.form);
    this.wrapper.append(this.textContainer, this.image);
    this.section.append(this.wrapper);

    return this.section;
  }
}
