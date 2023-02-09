import Common from '../../../utils/common';
import AddItemButton from '../addItemButton';
import Task from './task/task';

export default class TasksList {
  tasksList: HTMLElement;

  title: HTMLElement;

  addCardButton: AddItemButton;

  constructor(title: string) {
    this.tasksList = Common.createDOMNode('div', ['tasks-list']);
    this.title = Common.createDOMNode('span', ['tasks-list__title'], title);
    this.addCardButton = new AddItemButton(
      'add a card',
      'Enter a little for this card...',
      'add card',
      this.addCart.bind(this)
    );

    this.tasksList.append(this.title, this.addCardButton.container);
  }

  addCart() {
    const task = new Task(this.addCardButton.data);
    this.addCardButton.close();
    this.tasksList.insertBefore(task.task, this.addCardButton.container);
  }
}
