import Common from '../../../../utils/common';
import taskModal, { TaskModal } from './TaskModal';

export default class Task {
  public task: HTMLElement;

  private title: HTMLElement;

  public labelContainer: HTMLElement;

  private taskInfo: HTMLElement;

  private description: HTMLElement;

  private interaction: HTMLElement;

  private selectedTask: HTMLElement | undefined;

  private modal: TaskModal;

  public comments: HTMLElement;

  public checklist: HTMLElement;

  public descriptionIcon: HTMLElement;

  private commentsIcon: HTMLElement;

  private checkListsIcon: HTMLElement;

  private containerIcon: HTMLElement;

  checkListsValue: HTMLElement;

  commentsValue: HTMLElement;

  constructor(
    title: string,
    onClick: (event: Event) => void,
    id: string,
    description?: string,
    checkLists?: [{ all: number; checked: number }],
    comments?: number
  ) {
    this.task = Common.createDOMNode('div', ['task']);
    this.task.draggable = true;
    this.title = Common.createDOMNode('span', ['task__title'], title);
    this.interaction = Common.createDOMNode('div', ['task__interaction']);
    this.labelContainer = Common.createDomNode('div', ['task__label-container']);
    this.taskInfo = Common.createDomNode('div', ['task__info__container']);
    this.description = Common.createDomNode('div', ['task__description']);
    this.checklist = Common.createDomNode('div', ['task__checklist']);
    this.comments = Common.createDomNode('div', ['task__comments']);
    this.task.setAttribute('data-title', title);
    this.task.setAttribute('data-id', id);
    this.modal = taskModal;
    this.selectedTask = undefined;

    this.containerIcon = Common.createDOMNode('span', ['task__icon']);
    this.descriptionIcon = Common.createDOMNode('span', ['task__icon__description']);
    this.commentsIcon = Common.createDOMNode('span', ['task__icon__comments']);
    this.commentsValue = Common.createDOMNode('span', ['task__icon__comments-value']);
    this.checkListsIcon = Common.createDOMNode('span', ['task__icon__checklists']);
    this.checkListsValue = Common.createDOMNode('span', ['task__icon__checklists-value']);

    this.append();
    this.initIcon(description, checkLists, comments);
    this.addHandlers(onClick);
  }

  private append() {
    this.containerIcon.append(
      this.descriptionIcon,
      this.commentsIcon,
      this.commentsValue,
      this.checkListsIcon,
      this.checkListsValue
    );
    this.taskInfo.append(this.description, this.checklist, this.comments);
    this.task.append(this.labelContainer, this.title, this.interaction, this.taskInfo, this.containerIcon);
  }

  private addHandlers(onClick: (event: Event) => void) {
    this.task.addEventListener('click', onClick);

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
    });
  }

  initIcon(description?: string, checkLists?: [{ all: number; checked: number }], comments?: number) {
    description ? this.descriptionIcon.classList.remove('hidden') : this.descriptionIcon.classList.add('hidden');
    if (checkLists && checkLists[0].all) {
      this.checkListsValue.textContent = `${checkLists[0].checked}/${checkLists[0].all}`;
      this.checkListsIcon.classList.remove('hidden');
      this.checkListsValue.classList.remove('hidden');
    } else {
      this.checkListsIcon.classList.add('hidden');
      this.checkListsValue.classList.add('hidden');
    }
    if (comments) {
      this.commentsValue.textContent = String(comments);
      this.commentsIcon.classList.remove('hidden');
      this.commentsValue.classList.remove('hidden');
    } else {
      this.commentsIcon.classList.add('hidden');
      this.commentsValue.classList.add('hidden');
    }
  }
}
