import Common from '../../../../utils/common';
import Priority from './priority/priority';

export default class Task {
  task: HTMLElement;

  title: HTMLElement;

  priority: Priority;

  constructor(title: string) {
    this.task = Common.createDOMNode('div', ['task']);
    this.task.draggable = true;
    this.title = Common.createDOMNode('span', ['task__title'], title);
    this.priority = new Priority();
    this.task.append(this.title, this.priority.priority);

    this.task.addEventListener('dragstart', (event: DragEvent) => {
      event.dataTransfer?.setData('data', this.title.textContent!);

      setTimeout(() => {
        this.task.classList.add('hidden');
      }, 0);
    });
    this.task.addEventListener('dragend', () => {
      this.task.parentNode?.removeChild(this.task);
    });
  }
}
