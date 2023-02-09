import Common from '../../../../../utils/common';

export default class Priority {
  priority: HTMLElement;

  constructor() {
    this.priority = Common.createDOMNode('span', ['priority']);
  }
}
