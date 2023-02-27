import Lang from '../../../common/lang/lang';
import Common from '../../../utils/common';

export default class Start {
  private section: HTMLElement;

  private wrapper: HTMLElement;

  private title: HTMLElement;

  private emailWrapper: HTMLElement;

  private email: HTMLInputElement;

  private submit: HTMLButtonElement;

  constructor() {
    const text = new Lang();
    this.section = Common.createDomNode('section', ['start']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'start__wrapper']);
    this.title = Common.createDomNode('h2', ['start__title'], text.text.start.title);
    this.emailWrapper = Common.createDomNode('div', ['start__form']);
    this.email = Common.createDomNodeInput(text.text.singupSection.email, 'email', ['start__email'], 'email');
    this.submit = Common.createDomNodeButton(['button', 'start__submit', 'submit'], text.text.singupSection.submit);
  }

  public append() {
    this.emailWrapper.append(this.email, this.submit);
    this.wrapper.append(this.title, this.emailWrapper);
    this.section.append(this.wrapper);
    Common.setLocalEmail(this.submit, this.email);

    return this.section;
  }
}
