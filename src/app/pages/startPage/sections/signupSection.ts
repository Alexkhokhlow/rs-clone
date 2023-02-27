import Lang from '../../../common/lang/lang';
import Common from '../../../utils/common';

export default class SignupSection {
  public section: HTMLElement;

  private wrapper: HTMLElement;

  private textContainer: HTMLElement;

  private title: HTMLElement;

  private subtitle: HTMLElement;

  private emailWrapper: HTMLElement;

  private email: HTMLInputElement;

  private submit: HTMLButtonElement;

  private image: HTMLElement;

  constructor() {
    const text = new Lang()
    this.section = Common.createDomNode('section', ['signup__section']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'signup__wrapper']);
    this.textContainer = Common.createDomNode('div', ['signup__container__text']);
    this.title = Common.createDomNode(
      'h1',
      ['signup__title'],
      text.text.singupSection.title
    );
    this.subtitle = Common.createDomNode(
      'h3',
      ['signup__subtitle'],
      text.text.singupSection.subtitle
    );
    this.emailWrapper = Common.createDomNode('div', ['signup__form']);
    this.email = Common.createDomNodeInput('Email', 'email', ['signup__email'], text.text.singupSection.email);
    this.submit = Common.createDomNodeButton(['button', 'signup__submit', 'submit'], text.text.singupSection.submit);
    this.image = Common.createDomNode('div', ['signup__image']);
  }

  public append() {
    this.emailWrapper.append(this.email, this.submit);
    this.textContainer.append(this.title, this.subtitle, this.emailWrapper);
    this.wrapper.append(this.textContainer, this.image);
    this.section.append(this.wrapper);
    Common.setLocalEmail(this.submit, this.email);

    return this.section;
  }
}
