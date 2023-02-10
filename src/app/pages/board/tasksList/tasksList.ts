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
      this.onAddCart.bind(this)
    );

    this.tasksList.addEventListener('dragover', (event: Event) => {
      event.preventDefault();
    });

    this.tasksList.addEventListener('dragenter', function (event: Event) {
      this.classList.add('hovered');
      //  console.log(1);
    });

    this.tasksList.addEventListener('dragleave', function () {
      this.classList.remove('hovered');
      // console.log(2);
    });
    this.tasksList.addEventListener('drop', function (event: Event) {
      event.preventDefault();
      const target = event.currentTarget as HTMLElement;
      //this.append(this.task);
      // if (target.className === 'tasks-list') {
      //   dragged.parentNode.removeChild(dragged);
      //   target.appendChild(dragged);
      // }
      const drag = event as DragEvent;
      const task = new Task(drag.dataTransfer?.getData('data') as string);
      this.insertBefore(task.task, this.children[this.children.length - 1]);
    });

    this.tasksList.append(this.title, this.addCardButton.container);
  }

  onAddCart() {
    const task = new Task(this.addCardButton.form.data);
    this.addCardButton.onClose();
    this.tasksList.insertBefore(task.task, this.addCardButton.container);
  }
}
