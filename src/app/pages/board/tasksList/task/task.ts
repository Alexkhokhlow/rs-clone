import Common from '../../../../utils/common';
import Priority from './priority/priority';

export default class Task {
  task: HTMLElement;

  title: HTMLElement;

  priority: Priority;

  constructor(title: string) {
    this.task = Common.createDOMNode('div', ['task']);
    this.task.draggable = true;
    this.title = Common.createDOMNode('span', ['task__title'], title);
    this.priority = new Priority();
    this.task.append(this.title, this.priority.priority);
    this.dragAndDrop();
  }

  private dragAndDrop() {
    this.task.addEventListener('dragstart', () => {
      setTimeout(() => {
        this.task.classList.add('hidden');
      }, 0);
    })
    this.task.addEventListener('dragend', () => {
        this.task.classList.remove('hidden');
    })

    const lists = document.querySelectorAll('.tasks-list') as NodeListOf<HTMLElement>;

    lists.forEach(list => {
      list.addEventListener('dragover', (event: Event) => {
        event.preventDefault();
      });
      list.addEventListener('dragenter', function() {
        this.classList.add('hovered');
        console.log(1)

      });
      list.addEventListener('dragleave', function(){
        this.classList.remove('hovered');
        console.log(2)

      });
      list.addEventListener('drop', function(event: Event) {
        event.preventDefault();
        this.append(this.task);
      });
    })
      
  }
}
