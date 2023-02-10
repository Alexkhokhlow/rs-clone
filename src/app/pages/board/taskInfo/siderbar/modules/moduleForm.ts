import Common from '../../../../../utils/common';

const closeIcon = require('../../../../../../assets/board/close.svg') as string;

export default class ModuleForm {
  module: HTMLElement;
  title: HTMLElement;
  closeIcon: HTMLImageElement;

  constructor() {
    this.module = Common.createDomNode('div', ['module']);
    this.title = Common.createDomNode('span', ['module__title']);
    this.closeIcon = Common.createDomNodeImg(['close'], closeIcon);
    this.module.append(this.title, this.closeIcon);

    this.closeIcon.addEventListener('click', this.onClose.bind(this));
  }

  init(title: string, body: HTMLElement) {
    this.title.textContent = title;
    this.module.append(body);
  }

  onClose(){
    this.module.classList.remove('active');
  }
}
