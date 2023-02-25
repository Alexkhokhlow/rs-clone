import Common from '../../../../utils/common';
import Priority from './priority/priority';
import taskModal, { TaskModal } from './TaskModal';

export default class Task {
  public task: HTMLElement;

  private title: HTMLElement;

  public labelContainer: HTMLElement;

  private taskInfo: HTMLElement;

  priority: Priority;

  interaction: HTMLElement;

  selectedTask: HTMLElement | undefined;

  modal: TaskModal;

  public checklist: HTMLElement;

  constructor(title: string, onClick: (event: Event) => void, listName: string, index: string, id: string) {
    this.task = Common.createDOMNode('div', ['task']);
    this.task.draggable = true;
    this.title = Common.createDOMNode('span', ['task__title'], title);
    this.interaction = Common.createDOMNode('div', ['task__interaction']);
    this.labelContainer = Common.createDomNode('div', ['task__label-container']);
    this.taskInfo = Common.createDomNode('div', ['task__info__container']);
    this.description = Common.createDomNode('div', ['task__description']);
    this.checklist = Common.createDomNode('div', ['task__checklist']);
    this.task.setAttribute('data-title', title);
    this.task.setAttribute('data-id', id);
    this.append();
    this.listen(onClick);
  }

  private append() {
    this.taskInfo.append(this.description, this.checklist);
    this.task.append(this.labelContainer, this.title, this.taskInfo);
  }

  private listen(onClick: (event: Event) => void) {
    this.task.addEventListener('click', onClick);
    this.task.append(this.labelContainer, this.title, this.priority.priority, this.interaction);

    this.modal = taskModal;
    this.selectedTask = undefined;

    this.addHandlers();
  }

  private addHandlers() {
    this.interaction.addEventListener('click', (e) => {
      e.stopPropagation();
      this.selectedTask = (e.target as HTMLElement).closest('.task') as HTMLElement;
      console.log('here');

      if (this.selectedTask?.classList.contains('task_selected')) {
        this.modal.removeModalWindow();
      } else {
        console.log('hh');
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
