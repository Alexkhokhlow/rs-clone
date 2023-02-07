import Common from "../../../utils/common";

export default class CreateBoard {
  private section: HTMLElement;
  private titleWrapper: HTMLElement;
  private closeButton: HTMLElement;
  private title: HTMLElement;

  constructor() {
    this.section = Common.createDomNode('section', ['create']);
    this.titleWrapper = Common.createDomNode('div', ['create__wrapper']);
    this.closeButton = Common.createDomNode('div', ['close__button']);
    this.title = Common.createDomNode('p', ['create__title'], 'Workspace');
  }

  public append() {
    this.titleWrapper.append(this.title, this.closeButton);
    this.section.append(this.titleWrapper);
  }
}
