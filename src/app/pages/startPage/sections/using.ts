import Common from '../../../utils/common';

export default class Using {
  public section: HTMLElement;

  private wrapper: HTMLElement;

  private text: HTMLElement;

  private img: HTMLElement;

  constructor() {
    this.section = Common.createDomNode('section', ['using']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'using__wrapper']);
    this.text = Common.createDomNode(
      'p',
      ['using__text'],
      'Join over 2,000,000 teams worldwide that are using Trello to get more done.'
    );
    this.img = Common.createDomNode('div', ['using__img']);
  }

  public append() {
    this.wrapper.append(this.text, this.img);
    this.section.append(this.wrapper);

    return this.section;
  }
}
