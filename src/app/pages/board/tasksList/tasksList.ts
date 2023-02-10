import Common from '../../../utils/common';
import AddItemButton from '../common/addItemButton';
import Task from './task/task';

export default class TasksList {
  public tasksList: HTMLElement;

  private title: HTMLElement;

  private addCardButton: AddItemButton;

  private onClick: (event: Event) => void;

  titleText: string;

  constructor(title: string, onClick: (event: Event) => void) {
    this.onClick = onClick;
    this.titleText = title;
    this.tasksList = Common.createDOMNode('div', ['tasks-list']);
    this.title = Common.createDOMNode('span', ['tasks-list__title'], title);
    this.addCardButton = new AddItemButton(
      'add a card',
      'Enter a little for this card...',
      'add card',
      this.onAddCart.bind(this)
    );

    this.tasksList.append(this.title, this.addCardButton.container);
  }

  onAddCart() {
    if (this.addCardButton.form.data) {
      const task = new Task(this.addCardButton.form.data, this.onClick, this.titleText);
      this.addCardButton.onClose();
      this.tasksList.insertBefore(task.task, this.addCardButton.container);
    }
  }
}
