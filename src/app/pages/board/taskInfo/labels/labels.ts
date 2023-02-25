import Common from '../../../../utils/common';

export default class Labels {
  public labelsWrapper: HTMLElement;

  private labelsTitle: HTMLElement;

  public labels: HTMLElement;

  constructor() {
    this.labelsWrapper = Common.createDomNode('div', ['labels__wrapper', 'hidden']);
    this.labelsTitle = Common.createDomNode('h4', ['labels__title', 'sidebar__title'], 'Labels');
    this.labels = Common.createDomNode('div', ['labels__info']);
    this.append();
  }

  private append() {
    this.labelsWrapper.append(this.labelsTitle, this.labels);
  }
}
