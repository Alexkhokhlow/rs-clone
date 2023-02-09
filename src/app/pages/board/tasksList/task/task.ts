import Common from '../../../../utils/common';

export default class Task {
  task: HTMLElement;
  title: HTMLElement;

  constructor(title: string) {
    this.task = Common.createDOMNode('div', ['task']);
    this.title = Common.createDOMNode('span', ['task__title'], title);
    this.task.append(this.title);
  }
}
