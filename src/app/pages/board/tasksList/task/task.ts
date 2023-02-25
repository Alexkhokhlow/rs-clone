import Common from '../../../../utils/common';
import Priority from './priority/priority';
import taskModal, { TaskModal } from './TaskModal';

export default class Task {
  task: HTMLElement;

  title: HTMLElement;

  priority: Priority;

  interaction: HTMLElement;

  selectedTask: HTMLElement | undefined;

  modal: TaskModal;

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

    this.modal = taskModal;
    this.selectedTask = undefined;

    this.addHandlers();
  }

  private addHandlers() {
    this.interaction.addEventListener('click', (e) => {
      e.stopPropagation();
      this.selectedTask = (e.target as HTMLElement).closest('.task') as HTMLElement;

      if (this.selectedTask?.classList.contains('task_selected')) {
        this.modal.removeModalWindow();
      } else {
        document.body.append(this.modal.backdrop);
        this.selectedTask?.append(this.modal.modal);
        this.modal.setSelectedTask(this.selectedTask);
      }

      this.selectedTask?.classList.toggle('task_selected');
    });

    this.modal.backdrop.addEventListener('click', () => {
      this.modal.removeModalWindow();
      this.selectedTask?.classList.remove('task_selected');
    });
  }
}
