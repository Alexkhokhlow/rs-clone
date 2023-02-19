import Common from '../../../../utils/common';
import Priority from './priority/priority';

export default class Task {
  task: HTMLElement;

  title: HTMLElement;

  priority: Priority;

  interaction: HTMLElement;

  constructor(title: string, onClick: (event: Event) => void, listName: string, index: string, id: string) {
    this.task = Common.createDOMNode('div', ['task']);
    this.task.draggable = true;
    this.title = Common.createDOMNode('span', ['task__title'], title);
    this.interaction = Common.createDOMNode('div', ['task__interaction']);
    this.priority = new Priority();
    this.task.setAttribute('data-title', title);
    this.task.setAttribute('data-id', id);
    this.task.addEventListener('click', onClick);
    this.task.append(this.title, this.priority.priority, this.interaction);
  }
}
