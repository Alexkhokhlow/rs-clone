import Common from '../../../../utils/common';
import Priority from './priority/priority';

const count = 0;

export default class Task {
  task: HTMLElement;

  title: HTMLElement;

  priority: Priority;

  constructor(title: string, onClick: (event: Event) => void, listName: string) {
    this.task = Common.createDOMNode('div', ['task']);
    this.task.id = count.toString();
    this.task.draggable = true;
    this.title = Common.createDOMNode('span', ['task__title'], title);
    this.priority = new Priority();
    this.task.setAttribute('data-title', title);
    this.task.setAttribute('data-list', listName);
    this.task.addEventListener('click', onClick);
    this.task.append(this.title, this.priority.priority);

  }

}
