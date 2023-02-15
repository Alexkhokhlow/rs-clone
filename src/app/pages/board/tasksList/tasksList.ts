import Server from '../../../server/server';
import Common from '../../../utils/common';
import AddItemButton from '../common/addItemButton';
import Task from './task/task';

let draggedItem: HTMLElement | null;

export default class TasksList {
  public tasksList: HTMLElement;

  private title: HTMLElement;

  public addCardButton: AddItemButton;

  private onClick: (event: Event) => void;

  tasksWrapper: HTMLElement;

  titleText: string;
  server: Server;
  token: string | null;

  constructor(title: string, onClick: (event: Event) => void) {
    this.onClick = onClick;
    this.titleText = title;
    this.tasksList = Common.createDOMNode('div', ['tasks-list']);
    this.title = Common.createDOMNode('span', ['tasks-list__title'], title);
    this.server = new Server();
    this.token = localStorage.getItem('token');

    this.tasksWrapper = Common.createDomNode('div', ['tasks__wrapper']);
    this.addCardButton = new AddItemButton(
      'add a card',
      'Enter a title for this card...',
      'add card',
      this.onAddCart.bind(this)
    );

    this.tasksList.append(this.title, this.tasksWrapper, this.addCardButton.container);
  }

  onAddCart() {
    const name = this.addCardButton.form.data;
    const task = new Task(name, this.onClick, this.titleText);
    this.addCardButton.onClose();
    this.tasksWrapper.append(task.task);
    const { id } = this.tasksList.dataset;
    if (this.token && id) {
      this.server.createTask(this.token, id, name);
    }
    this.drag(task.task, this.tasksWrapper);
  }

  private drag(task: HTMLElement, list: HTMLElement) {
    task.addEventListener('dragstart', () => {
      draggedItem = task;

      setTimeout(() => {
        task.classList.add('hidden');
      }, 0);
    });

    task.addEventListener('dragend', () => {
      task.classList.remove('hidden');
      draggedItem = null;
    });

    this.tasksList.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    this.tasksList.addEventListener('dragenter', (event) => {
      event.preventDefault();
    });

    this.tasksList.addEventListener('drop', (event) => {
      event.preventDefault();
      list.append(draggedItem!);
    });
  }
}
