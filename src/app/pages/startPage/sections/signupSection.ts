import Common from '../../../utils/common';

export default class SignupSection {
  public section: HTMLElement;

  private wrapper: HTMLElement;

  private textContainer: HTMLElement;

  private title: HTMLElement;

  private subtitle: HTMLElement;

  private emailWrapper: HTMLElement;

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
    this.emailWrapper = Common.createDomNode('div', ['signup__form']);
    this.email = Common.createDomNodeInput('Email', 'email', ['signup__email'], 'email');
    this.submit = Common.createDomNodeButton(['button', 'signup__submit', 'submit'], "Sign up - it's free!");
    this.image = Common.createDomNode('div', ['signup__image']);
  }

  public append() {
    this.emailWrapper.append(this.email, this.submit);
    this.textContainer.append(this.title, this.subtitle, this.emailWrapper);
    this.wrapper.append(this.textContainer, this.image);
    this.section.append(this.wrapper);
    this.setLocalEmail();

    return this.section;
  }

  private setLocalEmail() {
    this.submit.addEventListener('click', () => {
      localStorage.setItem('email', this.email.value);
      window.location.href = '/signup';
    })
  }
}
