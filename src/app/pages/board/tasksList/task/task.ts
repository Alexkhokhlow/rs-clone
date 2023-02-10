import Common from '../../../../utils/common';
import Priority from './priority/priority';

let count = 0;

export default class Task {
  task: HTMLElement;

  title: HTMLElement;

  priority: Priority;

  constructor(title: string) {
    this.task = Common.createDOMNode('div', ['task']);
    this.task.id = count.toString();
    this.task.draggable = true;
    this.title = Common.createDOMNode('span', ['task__title'], title);
    this.priority = new Priority();
  }

  public append() {
    this.task.append(this.title, this.priority.priority);
    count++;

    return this.task;
  }
}
