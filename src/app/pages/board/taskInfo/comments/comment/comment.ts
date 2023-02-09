import Common from '../../../../../utils/common';
import AddItemButton from '../../../common/addItemButton';

export default class Comment {
  userName: HTMLElement;
  comment: HTMLElement;
  input: AddItemButton;
  edit: HTMLElement;
  delete: HTMLElement;
  data: string;
  id: number;

  constructor(text: string, onDelete: (event: Event) => void, id: number) {
    this.data = text;
    this.id = id;
    this.comment = Common.createDomNode('div', ['comment']);
    this.userName = Common.createDomNode('span', ['comment'], 'user name');
    this.input = new AddItemButton(text, text, 'save', this.onSave.bind(this));
    this.edit = Common.createDomNode('span', ['comment'], 'edit');
    this.delete = Common.createDomNode('span', ['comment'], 'delete');

    this.edit.addEventListener('click', this.onEdit.bind(this));
    this.delete.addEventListener('click', onDelete);
    this.delete.setAttribute('id', String(this.id));
    this.comment.append(this.userName, this.input.container, this.edit, this.delete);
  }

  onSave() {
    if (this.input.form.data) {
      this.input.button.textContent = this.input.form.data;
      this.data = this.input.form.data;
    } else {
      this.data = '';
      this.input.button.textContent = 'Add a more detailed description...';
    }

    this.input.button.setAttribute('value', this.input.form.data);
    this.input.onClose();
  }

  onEdit() {
    this.input.onActivate();
  }
}
