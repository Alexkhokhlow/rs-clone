import Common from '../../../utils/common';
import AddItemButton from '../addItemButton';
import Task from './task/task';
let draggedItem: HTMLElement | null;

export default class TasksList {
  tasksList: HTMLElement;

  title: HTMLElement;

  addCardButton: AddItemButton;

  tasksWrapper: HTMLElement;

  constructor(title: string) {
    this.tasksList = Common.createDOMNode('div', ['tasks-list']);
    this.title = Common.createDOMNode('span', ['tasks-list__title'], title);
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
    const task = new Task(this.addCardButton.form.data).append();
    this.addCardButton.onClose();
    this.tasksWrapper.append(task);

    this.drag(task, this.tasksWrapper);
  }

  private drag(task:HTMLElement, list: HTMLElement) {
    task.addEventListener('dragstart', (event: DragEvent) => {
      event.dataTransfer!.setData("data", (event.target as HTMLElement).id);
      event.dataTransfer!.effectAllowed = "move";
      // draggedItem = task;

      // setTimeout(() => {
      //   task.classList.add('hidden');
      // }, 0);
    });

    // task.addEventListener('dragend', () => {
    //   task.classList.remove('hidden');
    //   draggedItem = null;
    // });

    this.tasksList.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.dataTransfer!.dropEffect = "move";
    });
    
    // this.tasksList.addEventListener("dragenter", (event) => {
        // this.classList.add('hovered');

    //     event.preventDefault();
    // });

    // this.tasksList.addEventListener("dragleave", (event) => {
          // this.classList.remove('hovered');
    //     event.preventDefault();
    // })
    
    this.tasksList.addEventListener("drop", (event) => {
        event.preventDefault();
        const data = event.dataTransfer!.getData("application/my-app");
        if ((event.target as HTMLElement).closest('.tasks__wrapper')) {
          console.log(event.target);
        (event.target as HTMLElement).appendChild(document.getElementById(data)!);
        }
        // list.append(draggedItem!);
    });
  }
}
