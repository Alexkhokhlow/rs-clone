import Common from '../../../../utils/common';
import Priority from './priority/priority';

export default class Task {
  task: HTMLElement;

  title: HTMLElement;

  priority: Priority;

  interaction: HTMLElement;

  backdrop: HTMLElement;

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
    this.backdrop = Common.createDOMNode('div', ['backdrop']);

    this.addHandlers();
  }

  private addHandlers() {
    this.interaction.addEventListener('click', (e) => {
      e.stopPropagation();
      const selectedTask = (e.target as HTMLElement).closest('.task');
      if (selectedTask?.classList.contains('task_selected')) {
        this.backdrop.remove();
      } else {
        document.body.append(this.backdrop);
      }

      selectedTask?.classList.toggle('task_selected');

      this.backdrop.addEventListener('click', () => {
        this.backdrop.remove();
        selectedTask?.classList.remove('task_selected');
      });
      // TODO: открыть модальное окно
    });
  }
}
