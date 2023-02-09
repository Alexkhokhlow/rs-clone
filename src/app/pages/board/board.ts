import Common from '../../utils/common';
import AddItemButton from './addItemButton';
import TasksList from './tasksList/tasksList';

export default class Board {
  board: HTMLElement;

  addListButton: AddItemButton;

  listsContainer: HTMLElement;

  constructor() {
    this.board = Common.createDOMNode('section', ['board']);
    this.addListButton = new AddItemButton(
      'add another list',
      'Enter list title...',
      'Add list',
      this.addList.bind(this)
    );
    this.listsContainer = Common.createDOMNode('div', ['lists__container']);
    this.board.append(this.listsContainer, this.addListButton.container);
  }

  addList() {
    const list = new TasksList(this.addListButton.data);
    this.addListButton.close();
    this.listsContainer.append(list.tasksList);
  }
}
