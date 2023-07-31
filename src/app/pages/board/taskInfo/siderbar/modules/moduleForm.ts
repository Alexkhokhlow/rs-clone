import Common from '../../../../../utils/common';

const closeIcon = require('../../../../../../assets/board/close.svg') as string;

export default class ModuleForm {
  public module: HTMLElement;

  private title: HTMLElement;

  private closeIcon: HTMLImageElement;

  private moduleHeader: HTMLElement;

  private line: HTMLElement;

  constructor() {
    this.module = Common.createDomNode('div', ['module']);
    this.moduleHeader = Common.createDomNode('header', ['module__header']);
    this.title = Common.createDomNode('span', ['module__title']);
    this.closeIcon = Common.createDomNodeImg(['close'], closeIcon);
    this.line = Common.createDomNode('hr', ['horizontal__line']);
    this.moduleHeader.append(this.title, this.closeIcon);
    this.module.append(this.moduleHeader, this.line);

    this.closeIcon.addEventListener('click', this.onClose.bind(this));
  }

  init(title: string, body: HTMLElement) {
    this.title.textContent = title;
    this.module.append(body);
  }

  onClose() {
    this.module.classList.remove('active');
  }
}
