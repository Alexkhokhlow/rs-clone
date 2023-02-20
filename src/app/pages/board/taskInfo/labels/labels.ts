import Common from '../../../../utils/common';

export default class Labels {
  public labelsWrapper: HTMLElement;

  private labelsTitle: HTMLElement;

  public labels: HTMLElement;

  public addButton: HTMLButtonElement;

  constructor() {
    this.labelsWrapper = Common.createDomNode('div', ['labels__wrapper', 'hidden']);
    this.labelsTitle = Common.createDomNode('h4', ['labels__title', 'sidebar__title'], 'Labels');
    this.labels = Common.createDomNode('div', ['labels__info']);
    this.addButton = Common.createDomNodeButton(['labels__add'], '+');
    this.append();
  }

  private append() {
    this.labelsWrapper.append(this.labelsTitle, this.labels, this.addButton);
  }
}
