import Common from '../../../../utils/common';
import Priority from './priority/priority';

export default class Task {
  task: HTMLElement;

  title: HTMLElement;

  priority: Priority;

  constructor(title: string, onClick: (event: Event) => void) {
    this.task = Common.createDOMNode('div', ['task']);
    this.title = Common.createDOMNode('span', ['task__title'], title);
    this.priority = new Priority();
    this.task.append(this.title, this.priority.priority);
    this.task.setAttribute('title', title);
    this.task.addEventListener('click', onClick);
  }
}
