import Server from '../../../server/server';
import Common from '../../../utils/common';
import AddItemButton from '../common/addItemButton';
import Task from './task/task';

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
    this.tasksList.draggable = true;
    this.title = Common.createDOMNode('span', ['tasks-list__title'], title);
    this.title.contentEditable = 'true';
    this.server = new Server();
    this.token = localStorage.getItem('token');

    this.tasksWrapper = Common.createDomNode('div', ['tasks__wrapper']);
    this.addCardButton = new AddItemButton(
      'add a card',
      'Enter a title for this card...',
      'add card',
      this.onAddTask.bind(this)
    );

    this.tasksList.append(this.title, this.tasksWrapper, this.addCardButton.container);
  }

  async onAddTask() {
    const name = this.addCardButton.form.data;
    const index = String(this.tasksWrapper.children.length);
    this.addCardButton.onClose();
    const { id } = this.tasksWrapper.dataset;
    if (this.token && id) {
      const data = await this.server.createTask(this.token, id, name, index);
      const task = new Task(name, this.onClick, this.titleText, index, data.id);
      this.tasksWrapper.append(task.task);
    }
  }
}
