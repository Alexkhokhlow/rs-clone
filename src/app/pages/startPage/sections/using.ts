import Lang from '../../../common/lang/lang';
import Common from '../../../utils/common';

export default class Using {
  public section: HTMLElement;

  private wrapper: HTMLElement;

  private text: HTMLElement;

  private img: HTMLElement;

  constructor() {
    const text = new Lang();
    this.section = Common.createDomNode('section', ['using']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'using__wrapper']);
    this.text = Common.createDomNode('p', ['using__text'], text.text.using.text);
    this.img = Common.createDomNode('div', ['using__img']);
  }

  public append() {
    this.wrapper.append(this.text, this.img);
    this.section.append(this.wrapper);

    return this.section;
  }
}
